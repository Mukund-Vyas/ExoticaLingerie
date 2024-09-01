const Product = require('../models/ProductModel.js');
const csvtojson = require('csvtojson');
const path = require('path');
const axios = require('axios');
const fs = require('fs-extra');
const dotenv = require('dotenv');
dotenv.config();

// ============================= Helper Functions =============================
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
  const writePath = path.join(__dirname, '..', 'images', filename);  // Set local path for the image

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
// ============================= Helper Functions =============================

// Controller function to handle GET request for fetching all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get products with limited fields
const getLimitedProducts = async (req, res) => {
  try {
    const products = await Product.find({}, '_id productname brandname price discount variations');
    res.json(products);
  } catch (error) {
    console.error('Error fetching limited products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to handle GET request for fetching a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to handle POST request for adding a new product
const addProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to handle PUT request for updating an existing product by ID
const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to handle DELETE request for removing a product by ID
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to handle GET request for fetching a product by Sub catogories
const getProductsBySubcategory = async (req, res) => {
  try {
    // Extract the subcategory from request query parameters
    const subcategory = req.params.subcategory;

    // Check if the subcategory is provided
    if (!subcategory) {
      return res.status(400).json({ message: 'Subcategory is required' });
    }

    // Find products matching the given subcategory
    const products = await Product.find({ productSubCategory: subcategory });

    // If no products found, return a 404 status
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this subcategory' });
    }

    // Return the products
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by subcategory:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to handle POST request to add products to db with csv
const uploadCSVProducts = async (req, res) => {
  console.log("comes for add");
  
  try {
    // Check for the passKey in request headers
    const passKey = req.headers['passkey'];
    if (!passKey || passKey !== process.env.AUTH_PASS_KEY) {
      return res.status(403).json({ error: 'Forbidden: Invalid passKey' });
    }

    const csvFilePath = req.file.path;
    const jsonObj = await csvtojson().fromFile(csvFilePath);

    const trimmedJsonObj = jsonObj.filter(item => {
      return item['StyleCode'] && item['productname'] && item['price'] && item['ItemSKU'];
    });

    const groupedProducts = {};

    for (const item of trimmedJsonObj) {
      const key = `${item['StyleCode']}-${item['PackType']}`;

      if (!groupedProducts[key]) {
        groupedProducts[key] = {
          productSKU: item['StyleCode'],
          brandname: item['brandname'],
          productname: item['productname'],
          productCategory: item['productCategory'],
          productSubCategory: item['SubCategory'],
          productFeatures: [
            { title: "Pack Type", description: item['PackType'] },
            { title: "Style Type", description: item['StyleType'] },
            { title: "Fabric Type", description: item['FabricType'] },
            { title: "Seam", description: item['Seam'] },
            { title: "Wiring", description: item['Wiring'] },
            { title: "Padding", description: item['Padding'] },
            { title: "Strap Type", description: item['StrapType'] },
            { title: "Support", description: item['Support'] },
            { title: "Hook Count", description: item['HookCount'] },
            { title: "Coverage", description: item['Coverage'] },
            { title: "Closure", description: item['Closure'] },
            { title: "Wash Care", description: item['WashCare'] },
            { title: "Care Instructions and Disclaimers", description: item['Disclaimer'] },
          ],
          variations: [],
          productDescription: item['productDescription'],
          productWashcare: item['WashCare'],
          material: item['FabricType'],
          productCode: item['HSN'],
          stockAvailability: parseInt(item['stock']),
          price: parseFloat(item['price']),
          discount: parseFloat(item['discount']),
          GST: "663784b143bae7e8f341ad6e",
        };
      }

      const newVariation = {
        color: item['Color'],
        size: item['Size'] ? [item['Size']] : [],
        SKU: item['ItemSKU'],
        imageUrls: []
      };

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

      // Check if the ItemSKU already exists in the database
      const existingProduct = await Product.findOne({ 'variations.SKU': newVariation.SKU });

      if (existingProduct) {
        // If the SKU exists, update the variation
        const variationIndex = existingProduct.variations.findIndex(variation => variation.SKU === newVariation.SKU);

        if (variationIndex !== -1) {
          // Merge sizes and image URLs
          existingProduct.variations[variationIndex].size.push(...newVariation.size);
          existingProduct.variations[variationIndex].imageUrls.push(...newVariation.imageUrls);
          existingProduct.variations[variationIndex].imageUrls = [...new Set(existingProduct.variations[variationIndex].imageUrls)];  // Remove duplicate URLs

          await existingProduct.save();  // Save the updated product
        }
      } else {
        // If the SKU does not exist, add it to the groupedProducts for insertion later
        groupedProducts[key].variations.push(newVariation);
      }
    }

    // Insert new products that do not have an existing SKU
    const productsToInsert = Object.values(groupedProducts).filter(product => product.variations.length > 0);

    console.log(productsToInsert.length);
    
    if (productsToInsert.length > 0) {
      await Product.insertMany(productsToInsert);  // Insert new products into MongoDB
      console.log("Products inserted");
    }

    res.status(200).json({ message: 'Products processed successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing CSV file' });
  } finally {
    await fs.remove(req.file.path);  // Clean up the uploaded CSV file
  }
};

module.exports = {
  getProducts,
  getLimitedProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  getProductsBySubcategory,
  uploadCSVProducts
};
