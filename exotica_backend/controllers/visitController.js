// controllers/visitController.js
const Visit = require('../models/visitModel');

// Function to log a visit
const Product = require('../models/ProductModel'); // Assuming you have a product model

// Function to log a visit
exports.trackVisit = async (req, res) => {
    try {
        const { page } = req.body;
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress; // To handle proxies and real IPs

        // Ignore admin routes
        if (page.startsWith('/admin') || page.startsWith('/orderDetails')) {
            return res.status(200).json({ message: 'Admin or orderDetails routes are not logged' });
        }        

        // Detect marketing campaign links by common query parameters
        let updatedPage = page; // Default to the original page

        if (page.includes('fbclid')) {
            updatedPage = '/facebook-clicks';  // Group Facebook clicks
        } else if (page.includes('gclid')) {
            updatedPage = '/google-clicks';  // Group Google Ads clicks
        } else if (page.includes('msclkid')) {
            updatedPage = '/bing-clicks';  // Group Bing Ads clicks
        } else if (page.includes('twclid')) {
            updatedPage = '/twitter-clicks';  // Group Twitter Ads clicks
        } else if (page.includes('li_fat_id')) {
            updatedPage = '/linkedin-clicks';  // Group LinkedIn Ads clicks
        }   else if (page.startsWith('/blogs')) {
            updatedPage = '/blogs';  // Group LinkedIn Ads clicks
        }

        // Handle product/item/{_id} routes
        if (page.startsWith('/products/item/')) {
            const productId = page.split('/products/item/')[1].split('?')[0];  // Extract the _id part
            
            try {
                // Fetch the product by its _id
                const product = await Product.findById(productId);
                if (!product) {
                    console.log("::: Product not found :::");
                    return res.status(404).json({ message: 'Product not found' });
                }
                const sku = product.productSKU; // Assuming SKU is stored in the product document
                updatedPage = `/product/item/${sku}`;  // Log with SKU URL instead of ID

                // Log the visit with the updated SKU URL
                const visit = new Visit({ ip, page: updatedPage });
                await visit.save();

                return res.status(200).json({ message: 'Visit logged successfully' });
            } catch (error) {
                console.error("Error fetching product:", error);
                return res.status(500).json({ error: 'Failed to fetch product by ID' });
            }
        } else {
            // Log visits for other routes, including marketing clicks grouped under their respective categories
            const visit = new Visit({ ip, page: updatedPage });
            await visit.save();
            return res.status(200).json({ message: 'Visit logged successfully' });
        }
    } catch (error) {
        console.error("Error logging visit:", error);
        res.status(500).json({ error: 'Failed to log visit' });
    }
};


// Helper function for daily visits
const getDailyVisits = async () => {
    const visits = await Visit.aggregate([
        { $match: { timestamp: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } } },
        { $group: { _id: { day: { $dayOfMonth: "$timestamp" } }, count: { $sum: 1 } } }
    ]);
    return visits;
};

// Helper function for monthly visits
const getMonthlyVisits = async () => {
    const visits = await Visit.aggregate([
        { $match: { timestamp: { $gte: new Date(new Date().setDate(1)) } } },
        { $group: { _id: { month: { $month: "$timestamp" } }, count: { $sum: 1 } } }
    ]);
    return visits;
};

// Helper function for yearly visits
const getYearlyVisits = async () => {
    const visits = await Visit.aggregate([
        { $match: { timestamp: { $gte: new Date(new Date().getFullYear(), 0, 1) } } },
        { $group: { _id: { year: { $year: "$timestamp" } }, count: { $sum: 1 } } }
    ]);
    return visits;
};

// Controller for daily visits report
exports.getDailyVisitsReport = async (req, res) => {
    try {
        const visits = await getDailyVisits();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get daily visits report' });
    }
};

// Controller for monthly visits report
exports.getMonthlyVisitsReport = async (req, res) => {
    try {
        const visits = await getMonthlyVisits();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get monthly visits report' });
    }
};

// Controller for yearly visits report
exports.getYearlyVisitsReport = async (req, res) => {
    try {
        const visits = await getYearlyVisits();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get yearly visits report' });
    }
};

// helper functions for URL wise reports
const getDailyVisitsByURL = async () => {
    const visits = await Visit.aggregate([
        {
            $match: {
                timestamp: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
            }
        },
        {
            $group: {
                _id: {
                    day: { $dayOfMonth: "$timestamp" },
                    page: "$page"  // Group by URL
                },
                count: { $sum: 1 }  // Count number of visits
            }
        },
        {
            $sort: { "_id.page": 1 }  // Optional: Sort by page URL
        }
    ]);
    return visits;
};

const getMonthlyVisitsByURL = async () => {
    const visits = await Visit.aggregate([
        {
            $match: {
                timestamp: { $gte: new Date(new Date().setDate(1)) }
            }
        },
        {
            $group: {
                _id: {
                    month: { $month: "$timestamp" },
                    page: "$page"  // Group by URL
                },
                count: { $sum: 1 }  // Count number of visits
            }
        },
        {
            $sort: { "_id.page": 1 }  // Optional: Sort by page URL
        }
    ]);
    return visits;
};

const getYearlyVisitsByURL = async () => {
    const visits = await Visit.aggregate([
        {
            $match: {
                timestamp: { $gte: new Date(new Date().getFullYear(), 0, 1) }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$timestamp" },
                    page: "$page"  // Group by URL
                },
                count: { $sum: 1 }  // Count number of visits
            }
        },
        {
            $sort: { "_id.page": 1 }  // Optional: Sort by page URL
        }
    ]);
    return visits;
};

// Daily URL-wise visits report
exports.getDailyVisitsByURLReport = async (req, res) => {
    try {
        const visits = await getDailyVisitsByURL();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get daily visits report' });
    }
};

// Monthly URL-wise visits report
exports.getMonthlyVisitsByURLReport = async (req, res) => {
    try {
        const visits = await getMonthlyVisitsByURL();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get monthly visits report' });
    }
};

// Yearly URL-wise visits report
exports.getYearlyVisitsByURLReport = async (req, res) => {
    try {
        const visits = await getYearlyVisitsByURL();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get yearly visits report' });
    }
};

// Helper function for date-wise total visits for the past 30 days
const getTotalVisitsLast30Days = async () => {
    const today = new Date();
    const past30Days = new Date();
    past30Days.setDate(today.getDate() - 30);

    const visits = await Visit.aggregate([
        {
            $match: {
                timestamp: { $gte: past30Days }  // Only consider visits in the last 30 days
            }
        },
        {
            $group: {
                _id: {
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
                    }
                },
                totalVisits: { $sum: 1 }
            }
        },
        {
            $sort: { "_id.date": 1 }  // Sort by date ascending
        }
    ]);
    return visits;
};

// Controller for last 30 days visits report
exports.getTotalVisitsLast30DaysReport = async (req, res) => {
    try {
        const visits = await getTotalVisitsLast30Days();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get total visits report for the last 30 days' });
    }
};
