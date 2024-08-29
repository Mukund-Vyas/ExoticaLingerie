const axios = require('axios');

async function getEasyEcomAuthToken() {
    try {
        const response = await axios.post('https://api.easyecom.io/access/token', {
            email: process.env.EASYECOM_EMAIL,
            password: process.env.EASYECOM_PASSWORD,
            location_key: process.env.EASYECOM_LOCATION
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        return response.data.data.token.jwt_token;
    } catch (error) {
        console.error('Error fetching EasyEcom auth token:', error);
        throw new Error('Failed to fetch EasyEcom auth token');
    }
}

module.exports = { getEasyEcomAuthToken };
