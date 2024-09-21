const mongoose = require('mongoose');

// Define the schema for a sub-topic
const subTopicSchema = new mongoose.Schema({
  subHeading: { type: String, required: true },
  subText: { type: String, required: true },
  subImage: { type: String }, // Optional field
  actionButton: {
    text: { type: String },   // Optional field
    link: { type: String },   // Optional field
  },
  designLayout: { type: Number, required: true, default: 1 }, // Random number between 1 and 3 for subtopic design
});

// Define the blog schema
const blogSchema = new mongoose.Schema({
  mainHeading: { type: String, required: true },
  mainText: { type: String, required: true },
  mainImage: { type: String, required: true },
  categories: { type: String, required: true },
  subTopics: [subTopicSchema], // Array of sub-topics with individual layouts
  tags: { type: [String], required: true }, // Array of tags
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Create and export the model
module.exports = mongoose.model('Blog', blogSchema);
