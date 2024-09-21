const Blog = require('../models/blogModel');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const mime = require('mime-types');

// Helper function to get 1 or 2 random tags from the provided list
const getRandomTags = (tags) => {
    if (!tags || tags.length === 0) return ''; // Return empty if no tags available
    const selectedTags = tags
        .sort(() => 0.5 - Math.random()) // Shuffle tags
        .slice(0, Math.min(10, tags.length)); // Select up to 10 tags
    return selectedTags.join('-').replace(/\s+/g, '-'); // Join tags with hyphens
};

// Helper function to download and save images locally in the blog folder
const downloadImage = async (url, filenamePrefix, tags) => {
    const blogImagesPath = path.join(__dirname, '../images/blog');

    // Ensure the 'blog' subfolder exists, create it if it doesn't
    if (!fs.existsSync(blogImagesPath)) {
        fs.mkdirSync(blogImagesPath, { recursive: true });
    }

    console.log("::: URL :::",url);
    
    // Fetch the image
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    // Get the content-type to determine the extension
    const contentType = response.headers['content-type'];
    let ext = mime.extension(contentType); // Extract the extension from content-type

    if (!ext) {
        // Fallback: Extract extension from URL
        const urlExt = path.extname(url).split('?')[0]; // Handle URLs with query params
        ext = urlExt ? urlExt.replace('.', '') : 'jpg'; // Default to 'jpg'
    }

    // Generate SEO-friendly filename with random tags
    const randomTags = getRandomTags(tags); // Get 1 or 2 random tags
    const filename = `${filenamePrefix}-${randomTags}-${Date.now()}.${ext}`;
    const imagePath = path.join(blogImagesPath, filename);

    // Save the image
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    // Return the relative path to the image once it's saved
    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(`/images/blog/${filename}`)); // Store path in DB
        writer.on('error', reject);
    });
};


// Create a new blog
exports.createBlog = async (req, res) => {
    console.log("::: Comes for creating Blog :::");
    
    try {
        const { mainHeading, mainText, mainImage, categories, subTopics, tags } = req.body;

        console.log("::: main function URL :::", mainImage);
        
        // Download and save the main image with random tags in the filename
        const mainImagePath = await downloadImage(mainImage, 'main', tags);

        // Process subtopics, downloading their images if present, and adding tags
        const updatedSubTopics = await Promise.all(
            subTopics.map(async (subTopic) => {
                let subImagePath = '';

                if (subTopic.subImage) {
                    // Download the subtopic image with random tags and assign a 'sub' prefix
                    subImagePath = await downloadImage(subTopic.subImage, 'sub', tags);
                }

                // Return the updated subtopic with the image path and random design layout
                return {
                    ...subTopic,
                    subImage: subImagePath || null,
                    designLayout: Math.floor(Math.random() * 3) + 1, // Random layout (1 to 3)
                };
            })
        );

        // Create the new blog entry
        const newBlog = new Blog({
            mainHeading,
            mainText,
            categories,
            mainImage: mainImagePath, // Store the path to the main image
            subTopics: updatedSubTopics,
            tags,
        });

        // Save to the database
        const savedBlog = await newBlog.save();

        return res.status(201).json({ message: 'Blog created successfully', blog: savedBlog });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
};

// Get blog main details for list page (without subtopics)
exports.getBlogsMainDetails = async (req, res) => {
    try {
        // Fetch blogs but exclude subTopics field
        const blogs = await Blog.find({}, {
            mainHeading: 1,
            mainText: 1,
            mainImage: 1,
            tags: 1,
            createdAt: 1,
        });

        return res.status(200).json({ message: 'Blogs fetched successfully', blogs });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching blog', error: error.message });
    }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
    try {
        const { mainHeading, mainText, mainImage, subTopics, tags } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { mainHeading, mainText, mainImage, subTopics, tags },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating blog', error: error.message });
    }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
};
