const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

// Route to track a visit
router.post('/track-visit', visitController.trackVisit);

// Route for daily visits report
router.get('/daily-visits', visitController.getDailyVisitsReport);

// Route for monthly visits report
router.get('/monthly-visits', visitController.getMonthlyVisitsReport);

// Route for yearly visits report
router.get('/yearly-visits', visitController.getYearlyVisitsReport);

// Routes for daily, monthly, yearly URL-wise reports
router.get('/daily-visits-url', visitController.getDailyVisitsByURLReport);
router.get('/monthly-visits-url', visitController.getMonthlyVisitsByURLReport);
router.get('/yearly-visits-url', visitController.getYearlyVisitsByURLReport);

// Routes for last 30 days visits report
router.get('/last-30-days', visitController.getTotalVisitsLast30DaysReport);
module.exports = router;