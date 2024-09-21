// controllers/visitController.js
const Visit = require('../models/visitModel');

// Function to log a visit
exports.trackVisit = async (req, res) => {
    try {
        const { page } = req.body;
        const ip = req.ip; // or use req.headers['x-forwarded-for'] for proxies
        const visit = new Visit({ ip, page });

        await visit.save();
        res.status(200).json({ message: 'Visit logged successfully' });
    } catch (error) {
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