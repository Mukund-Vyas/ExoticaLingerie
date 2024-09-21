const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

// Route to track a visit
router.post('/track-visit', visitController.trackVisit);

// Route for daily visits report
router.get('/daily-visits', reportController.getDailyVisitsReport);

// Route for monthly visits report
router.get('/monthly-visits', reportController.getMonthlyVisitsReport);

// Route for yearly visits report
router.get('/yearly-visits', reportController.getYearlyVisitsReport);

// Routes for daily, monthly, yearly URL-wise reports
router.get('/daily-visits-url', reportController.getDailyVisitsByURLReport);
router.get('/monthly-visits-url', reportController.getMonthlyVisitsByURLReport);
router.get('/yearly-visits-url', reportController.getYearlyVisitsByURLReport);

module.exports = router;