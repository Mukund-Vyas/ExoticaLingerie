const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');
const auth = require('../middleware/adminAuthMiddleware');

// Route to track a visit
router.post('/track-visit', visitController.trackVisit);

// Route for daily visits report
router.get('/daily-visits', auth, visitController.getDailyVisitsReport);

// Route for monthly visits report
router.get('/monthly-visits', auth, visitController.getMonthlyVisitsReport);

// Route for yearly visits report
router.get('/yearly-visits', auth, visitController.getYearlyVisitsReport);

// Routes for daily, monthly, yearly URL-wise reports
router.get('/daily-visits-url', auth, visitController.getDailyVisitsByURLReport);
router.get('/monthly-visits-url', auth, visitController.getMonthlyVisitsByURLReport);
router.get('/yearly-visits-url', auth, visitController.getYearlyVisitsByURLReport);

// Routes for last 30 days visits report
router.get('/last-30-days', auth, visitController.getTotalVisitsLast30DaysReport);
module.exports = router;