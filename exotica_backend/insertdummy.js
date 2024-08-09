const mongoose = require('mongoose');
const csvtojson = require('csvtojson');
const path = require('path');
const Product = require('./models/ProductModel.js');
const dotenv = require('dotenv');
// Load environment variables from .env file
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

const filePath = path.join("C:/Users/Admin/Downloads/Bra.csv");
csvtojson()
  .fromFile(filePath)
  .then(async (jsonObj) => {

    // Grouping by common fields (ItemSKU, brandname, productname, productCategory)
    const groupedProducts = {};

    jsonObj.forEach(item => {
      const key = `${item['StyleCode']}-${item['productname']}`;

      if (!groupedProducts[key]) {
        groupedProducts[key] = {
          productSKU: item['ItemSKU'],
          brandname: item['brandname'],
          productname: item['productname'],
          productCategory: item['productCategory'],
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
          GST: "663784b143bae7e8f341ad6e", // Example GST ID, adjust as needed
        };
      }

      // Ensure each unique combination of color and size is added as a separate variation
      const newVariation = {
        color: item['Color'],
        size: item['Size'] ? [item['Size']] : [],
        SKU: item['ItemSKU'] + "-" + item['Size'],
        imageUrls: [item['imageUrl1'], item['imageUrl2'], item['imageUrl3'], item['imageUrl4'], item['imageUrl5']].filter(url => url)
      };

      const existingVariationIndex = groupedProducts[key].variations.findIndex(variation =>
        variation.color === newVariation.color
      );

      if (existingVariationIndex !== -1) {
        // If the variation already exists, merge sizes and image URLs
        groupedProducts[key].variations[existingVariationIndex].size.push(...newVariation.size);
        groupedProducts[key].variations[existingVariationIndex].imageUrls.push(...newVariation.imageUrls);
        groupedProducts[key].variations[existingVariationIndex].imageUrls = [...new Set(groupedProducts[key].variations[existingVariationIndex].imageUrls)]; // Remove duplicates
      } else {
        groupedProducts[key].variations.push(newVariation);
      }
    });

    const products = Object.values(groupedProducts);

    try {
      await Product.insertMany(products);
      console.log('Products inserted successfully');
    } catch (error) {
      console.error('Error inserting products:', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('Error parsing CSV:', err);
  });
