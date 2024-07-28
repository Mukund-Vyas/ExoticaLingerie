const mongoose = require('mongoose');
const Product = require('./models/ProductModel.js');
const dotenv = require('dotenv')
// Load environment variables from .env file
dotenv.config()

// MongoDB Atlas connection string
const mongoURI =process.env.MONGODB_URI;

// Dummy data
const products = [
  {
    productSKU: "SKU001",
    brandname: "Exotica Lingerie",
    productname: "Lingerie Set A",
    productCategory: "Lingerie",
    productFeatures: {
      title: "Comfortable Lingerie Set",
      description: "A comfortable and stylish lingerie set made from high-quality materials."
    },
    variations: [
      {
        color: "Red",
        imageUrls: [
          "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
          "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["S", "M", "L"]
      },
      {
        color: "Black",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["S", "M", "L", "XL"]
      }
    ],
    productDescription: "This lingerie set is designed for ultimate comfort and style. Available in multiple colors and sizes.",
    productWashcare: "Hand wash only.",
    price: 49.99,
    discount: 10,
    GST: new mongoose.Types.ObjectId()
  },
  {
    productSKU: "SKU002",
    brandname: "Exotica Lingerie",
    productname: "Lingerie Set B",
    productCategory: "Lingerie",
    productFeatures: {
      title: "Elegant Lingerie Set",
      description: "An elegant lingerie set with lace details."
    },
    variations: [
      {
        color: "White",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["M", "L", "XL"]
      },
      {
        color: "Pink",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["S", "M", "L", "XL"]
      }
    ],
    productDescription: "This elegant lingerie set features beautiful lace details. Available in multiple colors and sizes.",
    productWashcare: "Machine wash cold.",
    price: 59.99,
    discount: 15,
    GST: new mongoose.Types.ObjectId()
  },
  {
    productSKU: "SKU003",
    brandname: "Hiral Enterprise",
    productname: "Lingerie Set C",
    productCategory: "Lingerie",
    productFeatures: {
      title: "Sexy Lingerie Set",
      description: "A sexy and daring lingerie set."
    },
    variations: [
      {
        color: "Blue",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["S", "M", "L"]
      },
      {
        color: "Purple",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["M", "L", "XL"]
      }
    ],
    productDescription: "This sexy lingerie set is perfect for special occasions. Available in multiple colors and sizes.",
    productWashcare: "Hand wash recommended.",
    price: 69.99,
    discount: 20,
    GST: new mongoose.Types.ObjectId()
  },
  {
    productSKU: "SKU004",
    brandname: "SH Global",
    productname: "Lingerie Set D",
    productCategory: "Lingerie",
    productFeatures: {
      title: "Luxury Lingerie Set",
      description: "A luxurious lingerie set made with premium materials."
    },
    variations: [
      {
        color: "Green",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["S", "M", "L", "XL"]
      },
      {
        color: "Yellow",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["M", "L"]
      }
    ],
    productDescription: "This luxury lingerie set is designed for ultimate elegance and comfort. Available in multiple colors and sizes.",
    productWashcare: "Dry clean only.",
    price: 79.99,
    discount: 25,
    GST: new mongoose.Types.ObjectId()
  },
  {
    productSKU: "SKU005",
    brandname: "V & P Enterprise",
    productname: "Lingerie Set E",
    productCategory: "Lingerie",
    productFeatures: {
      title: "Casual Lingerie Set",
      description: "A casual lingerie set perfect for everyday wear."
    },
    variations: [
      {
        color: "Orange",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["S", "M", "L"]
      },
      {
        color: "Brown",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["M", "L", "XL"]
      }
    ],
    productDescription: "This casual lingerie set is comfortable and stylish, perfect for everyday wear. Available in multiple colors and sizes.",
    productWashcare: "Machine wash warm.",
    price: 39.99,
    discount: 5,
    GST: new mongoose.Types.ObjectId()
  },
  {
    productSKU: "SKU006",
    brandname: "Exotica Lingerie",
    productname: "Lingerie Set F",
    productCategory: "Lingerie",
    productFeatures: {
      title: "Sporty Lingerie Set",
      description: "A sporty lingerie set for active wear."
    },
    variations: [
      {
        color: "Grey",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["S", "M", "L"]
      },
      {
        color: "Black",
        imageUrls: [
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1690694715/Exotica_amq2of.png",
            "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
        ],
        size: ["M", "L", "XL"]
      }
    ],
    productDescription: "This sporty lingerie set is designed for active wear and comfort. Available in multiple colors and sizes.",
    productWashcare: "Machine wash cold.",
    price: 29.99,
    discount: 10,
    GST: new mongoose.Types.ObjectId()
  }
];

// Insert dummy data into the database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.insertMany(products);
    console.log('Dummy products inserted successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting dummy products:', err);
    mongoose.connection.close();
  });
