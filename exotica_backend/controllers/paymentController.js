// controllers/paymentController.js
const crypto = require('crypto');
const axios = require('axios');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');  // Ensure you have the User model imported

const newPayment = async (req, res) => {
    try {
        const merchantTransactionId = 'EXLTID' + Date.now() + crypto.randomBytes(4).toString('hex');;
        const { price, orderNumber } = req.body;
        const user_id = req.user._id;// Extract user_id from req.user

        const user = await User.findById(user_id).select('mobile firstName lastName').exec();
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        
        const decryptedPhone = User.decrypt(user.mobile);
        console.log(decryptedPhone);
        
        const name = user.firstName + user.lastName;

        const data = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: "ELUID" + user_id,
            name: name,
            amount: price * 100,
            redirectUrl: `${process.env.SITE_DOMAIN}/checkout/${merchantTransactionId}`,
            redirectMode: "POST",
            mobileNumber: decryptedPhone,
            paymentInstrument: {
                type: "PAY_PAGE",
            }
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        // Create a new transaction record before redirecting
        await Transaction.create({
            user: user_id,
            transactionId: merchantTransactionId,
            orderNumber:orderNumber,
            amount: price / 100,
            status: 'pending',
            paymentDetails: {
                ...data
            }
        });

        const response = await axios.request(options);
        console.log(response.data.data.instrumentResponse.redirectInfo.url);
        return res.status(200).send({redirectUrl : response.data.data.instrumentResponse.redirectInfo.url});
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message,
            success: false
        });
    }
};

const checkStatus = async (req, res) => {
    const merchantTransactionId = req.params['txnId'];
    const merchantId = process.env.MERCHANT_ID;
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + process.env.SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const options = {
        method: 'GET',
        url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    try {
        const response = await axios.request(options);
        // Update the transaction status based on the response
        const status = response.data.success ? 'completed' : 'failed';
        await Transaction.updateOne(
            { transactionId: merchantTransactionId },
            { status: status, updatedAt: new Date() }
        );

        if (response.data.success === true) {
            if(response.data.code === 'PAYMENT_PENDING'){
                return res.status(202).send({ success: true, message: "Payment Pending" });
            }
            else{
                return res.status(200).send({ success: true, message: "Payment Success" });
            }
        } else {
            return res.status(400).send({ success: false, message: "Payment Failure" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: err.message });
    }
};

module.exports = {
    newPayment,
    checkStatus
};