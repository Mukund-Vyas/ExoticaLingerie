const axios = require('axios');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.exoticalingerie.in',
    generateRobotsTxt: true, // Generate robots.txt
    changefreq: 'daily',
    sitemapSize: 5000,
    exclude: ['/admin*'], // Exclude admin routes

    // Create separate sitemaps
    generateIndexSitemap: true, // Generate a sitemap index file

    // Additional paths to create separate sitemaps
    additionalSitemaps: [
        `${process.env.SITE_URL}/sitemap-general.xml`,  // General pages sitemap
        `${process.env.SITE_URL}/sitemap-products.xml`, // Products sitemap
        `${process.env.SITE_URL}/sitemap-blogs.xml`,    // Blogs sitemap
    ],

    // Define different paths for general, products, and blogs
    additionalPaths: async (config) => {
        // General Pages
        const generalPages = [{ loc: '/', priority: 1.0, changefreq: 'daily' }];

        // Fetch product and blog URLs dynamically
        const productUrls = await fetchProductUrls();
        const blogUrls = await fetchBlogUrls();

        // Combine general pages with their specific paths
        return generalPages.concat(productUrls, blogUrls);
    },
};

// Fetch product URLs using axios and assign to 'sitemap-products.xml'
async function fetchProductUrls() {
    try {
        const { data: products } = await axios.get(process.env.GET_LAYOUT_PRODUCT_API_URL);

        // Map through products and their variations to create URL objects
        const productUrls = products.flatMap((product) =>
            product.variations.map((variation) => ({
                loc: `/products/item/${product._id}?color=${variation.color}&productname=${encodeURIComponent(product.productname)}`,
                changefreq: 'daily',
                priority: 0.8,
            }))
        );

        return productUrls;
    } catch (error) {
        console.error("Error fetching product URLs:", error);
        return [];
    }
}


// Fetch blog URLs using axios and assign to 'sitemap-blogs.xml'
async function fetchBlogUrls() {
    try {
        const { data: blogs } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/main-details`);
        return blogs.map((blog) => ({
            loc: `/blogs/${blog._id}?blogName=${encodeURIComponent(blog.mainHeading)}`,
            changefreq: 'weekly',
            priority: 0.6,
        }));
    } catch (error) {
        console.error("Error fetching blog URLs:", error);
        return [];
    }
}