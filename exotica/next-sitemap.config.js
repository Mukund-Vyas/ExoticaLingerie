/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.exoticalingerie.in', // Your website URL
    generateRobotsTxt: true, // (optional) Generate robots.txt file
    changefreq: 'daily', // Frequency with which the pages are likely to change
    priority: 0.7, // Default priority of URLs in the sitemap
    sitemapSize: 5000, // Max number of entries per sitemap file
    exclude: ['/admin*'], // (optional) Exclude specific routes
    // Add additional options as needed
};
