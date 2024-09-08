const axios = require('axios');

let eeauthToken = null;
let eetokenExpirationTime = null;

async function getEasyEcomAuthToken() {
    // Check if the token exists and hasn't expired
    if (eeauthToken && eetokenExpirationTime && Date.now() < eetokenExpirationTime) {
        return eeauthToken;
    }

    try {
        // Fetch a new token if it doesn't exist or has expired
        const response = await axios.post('https://api.easyecom.io/access/token', {
            email: process.env.EASYECOM_EMAIL,
            password: process.env.EASYECOM_PASSWORD,
            location_key: process.env.EASYECOM_LOCATION
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Store the token and its expiration time (60 days in milliseconds)
        eeauthToken = response.data.data.token.jwt_token;
        eetokenExpirationTime = Date.now() + (60 * 24 * 60 * 60 * 1000); // 60 days

        return eeauthToken;
    } catch (error) {
        console.error('Error fetching EasyEcom auth token:', error);
        throw new Error('Failed to fetch EasyEcom auth token');
    }
}

// Utility function to fetch tracking details for an order
const fetchTrackingDetails = async (orderNumber) => {
    const easyecomAPI = `https://api.easyecom.io/Carriers/getTrackingDetails?reference_code=${orderNumber}`;
    const authToken = await getEasyEcomAuthToken();

    try {
        const response = await axios.get(easyecomAPI, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data.data[0]; // Assuming you want the first tracking detail
    } catch (error) {
        console.error(`Error fetching tracking details for order ${orderNumber}:`, error);
        return null;
    }
};

module.exports = { getEasyEcomAuthToken, fetchTrackingDetails };