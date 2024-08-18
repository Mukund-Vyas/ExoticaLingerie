const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'One-time verification code',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Verification</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f6f6f6;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f6f6f6;  
                    }
                    .header {
                        text-align: left;
                        padding: 20px 0;
                    }
                    .header img {
                        height: 100px;
                        width: 140px;
                    }
                    .content {
                        padding: 32px 0;
                        text-align: left;
                        line-height: 1.5;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        border: 1px solid #f0f0f0;
                    }
                    .content h1 {
                        color: #3d4f58;
                        font-size: 24px;
                        font-weight: bold;
                        line-height: 28px;
                    }
                    .content p {
                        font-size: 16px;
                        color: #5e5e5e;
                    }
                    .otp-code {
                        font-size: 18px;
                        font-weight: bold;
                        color: #ff197d;
                        margin: 20px 0;
                        display: inline-block;
                        padding: 10px;
                        border-radius: 4px;
                        background-color: #f9f9f9;
                    }
                    .footer {
                        text-align: center;
                        padding: 24px 0;
                        font-size: 12px;
                        color: #999999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1721645914/qp305holqchmubfytdhx.png" alt="Company Logo">
                    </div>
                    <div class="content">
                        <h1>Action Required: One-Time Verification Code</h1>
                        <p>Dear User,</p>
                        <p>Thank you for signing up. Use the following OTP to complete your verification process:</p>
                        <div class="otp-code">${otp}</div>
                        <p>This OTP is valid for 5 minutes.</p>
                        <p>If you did not request this, please ignore this email or contact us for assistance.</p>
                        <p>
                            Regards, <br>Team Exotica Lingerie
                        </p>
                    </div>
                    <div class="footer">
                        <pThis message was sent from Exotica Lingerie.</p>
                        <!-- >&copy; 2024 Exotica Lingerie. All rights reserved. -->
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOrderConfirmationEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to:', to);
    } catch (error) {
        console.error('Error sending email to:', to, error);
    }
};

module.exports = { sendOtpEmail, generateOtp, sendOrderConfirmationEmail };