const mongoose = require('mongoose');
const csvtojson = require('csvtojson');
const path = require('path');
const axios = require('axios');
const fs = require('fs-extra');
const Product = require('./models/ProductModel.js');
const dotenv = require('dotenv');
dotenv.config();

// MongoDB Atlas connection string
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
// CSV file path
const filePath = path.join("D:/Mukund/EL/csvs/Bra (final)(Bra).csv");

// Helper function to convert Dropbox URL to a direct download URL
const convertDropboxUrl = (url) => {
    return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
};

// Helper function to extract SEO-based image filename
const getSEOImageName = (url, sku, color) => {
    const seoName = path.basename(url).split('?')[0];  // Extract filename without query parameters
    return `${sku}-${color}-${seoName}`;  // Combine SKU, color, and filename for SEO-friendly naming
};

// Function to download images and save locally
const downloadImage = async (url, filename) => {
    const writePath = path.join(__dirname, 'images', filename);  // Set local path for the image

    // Check if the image already exists
    if (await fs.pathExists(writePath)) {
        console.log(`Image already exists: ${writePath}`);
        return writePath;  // Skip download and return existing path
    }

    // If not found, download the image
    const response = await axios({
        url,
        responseType: 'stream'
    });

    await fs.ensureDir(path.dirname(writePath));  // Ensure the directory exists

    const writer = fs.createWriteStream(writePath);
    return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on('finish', () => resolve(writePath));
        writer.on('error', reject);
    });
};

csvtojson()
    .fromFile(filePath)
    .then(async (jsonObj) => {
        // Filter out rows that have empty or missing fields
        const trimmedJsonObj = jsonObj.filter(item => {
            // Ensure that critical fields (like productname, StyleCode, etc.) are present
            return item['StyleCode'] && item['productname'] && item['price'] && item['StyleCode'];  // Add other required fields as needed
        });

        const groupedProducts = {};

        for (const item of trimmedJsonObj) {  // Use trimmedJsonObj instead of jsonObj
            const key = `${item['StyleCode']}-${item['productname']}`;

            if (!groupedProducts[key]) {
                groupedProducts[key] = {
                    productSKU: item['StyleCode'],
                    brandname: item['brandname'],
                    productname: item['productname'],
                    productCategory: item['productCategory'],
                    productSubCategory: item['SubCategory'],
                    productFeatures: [
                        { title: "PackType", description: item['PackType'] },
                        { title: "StyleType", description: item['StyleType'] },
                        { title: "FabricType", description: item['FabricType'] },
                        { title: "Seam", description: item['Seam'] },
                        { title: "Wiring", description: item['Wiring'] },
                        { title: "Padding", description: item['Padding'] },
                        { title: "StrapType", description: item['StrapType'] },
                        { title: "Support", description: item['Support'] },
                        { title: "HookCount", description: item['HookCount'] },
                        { title: "Coverage", description: item['Coverage'] },
                    ],
                    variations: [],
                    productDescription: item['productDescription'],
                    productWashcare: item['WashCare'],
                    material: item['FabricType'],
                    productCode: item['HSN'],
                    stockAvailability: parseInt(item['stock']),
                    price: parseFloat(item['price']),
                    discount: parseFloat(item['discount']),
                    GST: "663784b143bae7e8f341ad6e",  // Hardcoded GST value (you can replace this with dynamic logic)
                };
            }

            const newVariation = {
                color: item['Color'],
                size: item['Size'] ? [item['Size']] : [],
                SKU: item['ItemSKU'],
                imageUrls: []
            };

            // Download and store images locally, converting Dropbox URLs to direct download links
            const imageUrls = [item['imageUrl1'], item['imageUrl2'], item['imageUrl3'], item['imageUrl4'], item['imageUrl5']]
                .filter(url => url)
                .map(url => convertDropboxUrl(url));  // Convert URLs for direct download

            for (const imageUrl of imageUrls) {
                const imageFilename = getSEOImageName(imageUrl, item['StyleCode'], item['Color']);  // SEO-friendly image naming
                try {
                    const localImagePath = await downloadImage(imageUrl, imageFilename);  // Download or use existing image
                    newVariation.imageUrls.push(path.basename(localImagePath));  // Save local image path
                } catch (error) {
                    console.error(`Failed to download image from ${imageUrl}:`, error);
                }
            }

            const existingVariationIndex = groupedProducts[key].variations.findIndex(variation =>
                variation.color === newVariation.color
            );

            if (existingVariationIndex !== -1) {
                // If variation exists, merge sizes and image URLs
                groupedProducts[key].variations[existingVariationIndex].size.push(...newVariation.size);
                groupedProducts[key].variations[existingVariationIndex].imageUrls.push(...newVariation.imageUrls);
                groupedProducts[key].variations[existingVariationIndex].imageUrls = [...new Set(groupedProducts[key].variations[existingVariationIndex].imageUrls)];  // Remove duplicate URLs
            } else {
                groupedProducts[key].variations.push(newVariation);  // Add new variation
            }
        }

        const products = Object.values(groupedProducts);

        try {
            await Product.insertMany(products);  // Insert products into MongoDB
            console.log('Products inserted successfully');
        } catch (error) {
            console.error('Error inserting products:', error);
        } finally {
            mongoose.connection.close();  // Close the MongoDB connection
        }
    })
    .catch(err => {
        console.error('Error parsing CSV:', err);
    });

