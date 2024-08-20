const { sendOrderConfirmationEmail } = require('../utils/otpmailer');
const Order = require('../models/ordersModel');
const User = require('../models/userModel');
const transactionModel = require('../models/transactionModel');
const { default: axios } = require('axios');
const { getEasyEcomAuthToken } = require('../utils/easyEcomUtils');

exports.createOrder = async (req, res) => {
    console.log("come for order");

    try {
        const userId = req.user._id; // Extract user ID from the JWT token
        const orderData = req.body;

        // Fetch user to verify if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userEmail = User.decrypt(user.email);
        // Create a new order
        const order = new Order({
            ...orderData,
            user: userId,
        });

        const savedOrder = await order.save();

        // Check if orderStatus is 1 before sending emails
        if (savedOrder.orderStatus === 1) {
            const authToken = await getEasyEcomAuthToken();

            // Create order on EasyEcom
            let easyEcomOrderData = {
                orderType: "retailorder",
                orderNumber: savedOrder.orderNumber,
                orderTotal: parseFloat(savedOrder.orderTotal),
                orderDate: Date.now(), // You can use the appropriate date here
                expDeliveryDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // Example: 7 days from now
                shippingCost: parseFloat(savedOrder.shippingCost),
                discount: parseFloat(savedOrder.discount),
                walletDiscount: 0,
                promoCodeDiscount: 0,
                prepaidDiscount: 0,
                paymentMode: 2,
                paymentGateway: "",
                shippingMethod: 1,
                packageWeight: 250,
                packageHeight: 2,
                packageWidth: 4,
                packageLength: 7,
                paymentTransactionId: savedOrder.paymentTransactionId || "NA",
                orderStatus: 1,
                items: savedOrder.items.map(item => ({
                    OrderItemId: item._id,
                    Sku: item.Sku,
                    productName: item.productName,
                    Quantity: item.Quantity,
                    Price: parseFloat(item.Price),
                    itemDiscount: parseFloat(item.itemDiscount),
                })),
                customer: savedOrder.customer
            };

            let easyeres = await axios.post('https://api.easyecom.io/webhook/v2/createOrder', easyEcomOrderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log(easyeres.data);

            let productDetails = '';
            savedOrder.items.forEach(item => {
                productDetails += `
                    <div>
                        <p>Product Name: ${item.productName}</p>
                        <p>Product SKU: ${item.Sku}</p>
                        <p>Quantity: ${item.Quantity}</p>
                        <p>Price: ₹${item.Price}</p>
                        <p>Item Discount: ₹${item.itemDiscount}</p>
                        <p>Total: ₹${item.Quantity * (item.Price - item.itemDiscount)}</p>
                        <hr>
                    </div>
                `;
            });

            let productDetailsCustomer = '';
            updatedOrder.items.forEach(item => {
                productDetailsCustomer += `
                    <div>
                        <p>Product Name: ${item.productName}</p>
                        <p>Quantity: ${item.Quantity}</p>
                        <p>Total: ₹${item.Quantity * (item.Price - item.itemDiscount)}</p>
                        <hr>
                    </div>
                `;
            });

            // Email content
            const customerEmailContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Order Confirmation</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            margin: 0;
                            padding: 0;
                            background-color: #f9f9f9;
                        }
                        .container {
                            width: 80%;
                            margin: auto;
                            background-color: #fff;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding-bottom: 30px;
                        }
                        .header img {
                            max-width: 220px;
                            height: auto;
                        }
                        .content {
                            margin-bottom: 20px;
                        }
                        .content h1 {
                            color: #2c3e50;
                            font-size: 24px;
                            margin-bottom: 10px;
                        }
                        .content p {
                            margin: 10px 0;
                        }
                        .order-summary {
                            border-top: 2px solid #ddd;
                            padding-top: 20px;
                        }
                        .order-summary h2 {
                            color: #e74c3c;
                            font-size: 20px;
                            margin-bottom: 10px;
                        }
                        .order-summary div {
                            margin-bottom: 15px;
                        }
                        .order-summary p {
                            margin: 5px 0;
                            font-size: 16px;
                        }
                        .thank-you {
                            text-align: center;
                            padding-top: 20px;
                            border-top: 2px solid #ddd;
                        }
                        .thank-you p {
                            margin: 5px 0;
                            font-size: 16px;
                        }
                        .highlight {
                            color: #e74c3c;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="https://www.dropbox.com/scl/fi/xwki7x87huxtxeoid9qdz/2.png?rlkey=d6zinjiskrxa8pbygdwxbcebp&st=0zkf2ltk&raw=1" alt="Brand Logo">
                        </div>
                        <div class="content">
                            <h1>Your Order is On Its Way!</h1>
                            <p>Awesome news! Your order has been successfully placed and is now being processed. 🎉</p>
                            <p><span class="highlight">Order Number:</span> ${savedOrder.orderNumber}</p>
                            <p><span class="highlight">Order Date:</span> ${savedOrder.orderDate}</p>
                            <p><span class="highlight">Expected Delivery Date:</span> ${savedOrder.expDeliveryDate}</p>
                            
                            <div class="order-summary">
                                <h2>Order Summary</h2>
                                <div>
                                    <p><span class="highlight">Total Amount:</span> ₹${savedOrder.orderTotal}</p>
                                </div>
                                <div>
                                    <h3>What's in Your Cart:</h3>
                                    ${productDetailsCustomer}
                                </div>
                            </div>
                        </div>
                        <div class="thank-you">
                            <p>Thank you for choosing us! 🌟</p>
                            <p>If you have any questions or need assistance, our support team is here to help.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const sellerEmailContent = `
                <h1>New Order Received</h1>
                <p>A new order has been placed!</p>
                <p>Order Number: ${savedOrder.orderNumber}</p>
                <p>Order Total: ₹${savedOrder.orderTotal}</p>
                <h2>Product Details:</h2>
                ${productDetails}
            `;

            // Send confirmation email to the customer
            await sendOrderConfirmationEmail(userEmail, 'Order Confirmation', customerEmailContent);

            // Send acknowledgment email to the seller (replace with actual seller email)
            // const sellerEmail = 'hiralenterprise5400@gmail.com';
            const sellerEmail = process.env.SELLER_EMAIL;
            await sendOrderConfirmationEmail(sellerEmail, 'New Order Received', sellerEmailContent);
        }
        // Respond with the saved order
        res.status(201).json(savedOrder);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user');
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
    try {
        // Fetch the existing order data before updating
        const transactionId = req.params.id;
        const transaction = await transactionModel.findOne({ transactionId: transactionId });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        const orderNumber = transaction.orderNumber;

        const existingOrder = await Order.findOne({ orderNumber: orderNumber });
        if (!existingOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        console.log(req.body);

        const updater = {
            orderStatus: req.body.status,
            paymentTransactionId: transactionId,
        }
        // Update the order
        const updatedOrder = await Order.findOneAndUpdate({ orderNumber: orderNumber }, updater, { new: true });

        // Check if orderStatus is updated to 1 updatedOrder.orderStatus === 1 && existingOrder.orderStatus !== 1
        if (updatedOrder.orderStatus === 1 && existingOrder.orderStatus !== 1) {
            const userId = updatedOrder.user;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const userEmail = User.decrypt(user.email);

            // Email content for customer
            let productDetails = '';
            updatedOrder.items.forEach(item => {
                productDetails += `
                    <div>
                        <p>Product Name: ${item.productName}</p>
                        <p>Product SKU: ${item.Sku}</p>
                        <p>Quantity: ${item.Quantity}</p>
                        <p>Price: ₹${item.Price}</p>
                        <p>Item Discount: ₹${item.itemDiscount}</p>
                        <p>Total: ₹${item.Quantity * (item.Price - item.itemDiscount)}</p>
                        <hr>
                    </div>
                `;
            });

            let productDetailsCustomer = '';
            updatedOrder.items.forEach(item => {
                productDetailsCustomer += `
                    <div>
                        <p>Product Name: ${item.productName}</p>
                        <p>Quantity: ${item.Quantity}</p>
                        <p>Total: ₹${item.Quantity * (item.Price - item.itemDiscount)}</p>
                        <hr>
                    </div>
                `;
            });
            // Email content
            const customerEmailContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Order Confirmation</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            margin: 0;
                            padding: 0;
                            background-color: #f9f9f9;
                        }
                        .container {
                            width: 80%;
                            margin: auto;
                            background-color: #fff;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding-bottom: 30px;
                        }
                        .header img {
                            max-width: 220px;
                            height: auto;
                        }
                        .content {
                            margin-bottom: 20px;
                        }
                        .content h1 {
                            color: #2c3e50;
                            font-size: 24px;
                            margin-bottom: 10px;
                        }
                        .content p {
                            margin: 10px 0;
                        }
                        .order-summary {
                            border-top: 2px solid #ddd;
                            padding-top: 20px;
                        }
                        .order-summary h2 {
                            color: #e74c3c;
                            font-size: 20px;
                            margin-bottom: 10px;
                        }
                        .order-summary div {
                            margin-bottom: 15px;
                        }
                        .order-summary p {
                            margin: 5px 0;
                            font-size: 16px;
                        }
                        .thank-you {
                            text-align: center;
                            padding-top: 20px;
                            border-top: 2px solid #ddd;
                        }
                        .thank-you p {
                            margin: 5px 0;
                            font-size: 16px;
                        }
                        .highlight {
                            color: #e74c3c;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="https://www.dropbox.com/scl/fi/xwki7x87huxtxeoid9qdz/2.png?rlkey=d6zinjiskrxa8pbygdwxbcebp&st=0zkf2ltk&raw=1" alt="Brand Logo">
                        </div>
                        <div class="content">
                            <h1>Your Order is On Its Way!</h1>
                            <p>Awesome news! Your order has been successfully placed and is now being processed. 🎉</p>
                            <p><span class="highlight">Order Number:</span> ${updatedOrder.orderNumber}</p>
                            <p><span class="highlight">Order Date:</span> ${updatedOrder.orderDate}</p>
                            <p><span class="highlight">Expected Delivery Date:</span> ${updatedOrder.expDeliveryDate}</p>
                            
                            <div class="order-summary">
                                <h2>Order Summary</h2>
                                <div>
                                    <p><span class="highlight">Total Amount:</span> ₹${updatedOrder.orderTotal}</p>
                                </div>
                                <div>
                                    <h3>What's in Your Cart:</h3>
                                    ${productDetailsCustomer}
                                </div>
                            </div>
                        </div>
                        <div class="thank-you">
                            <p>Thank you for choosing us! 🌟</p>
                            <p>If you have any questions or need assistance, our support team is here to help.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const sellerEmailContent = `
                <h1>New Order Received</h1>
                <p>A new order has been placed!</p>
                <p>Order Number: ${updatedOrder.orderNumber}</p>
                <p>Order Total: ₹${updatedOrder.orderTotal}</p>
                <h2>Product Details:</h2>
                ${productDetails}
            `;

            const authToken = await getEasyEcomAuthToken();

            // Create order on EasyEcom
            let easyEcomOrderData = {
                orderType: "retailorder",
                orderNumber: updatedOrder.orderNumber,
                orderTotal: updatedOrder.orderTotal,
                orderDate: Date.now(), // You can use the appropriate date here
                expDeliveryDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // Example: 7 days from now
                shippingCost: updatedOrder.shippingCost,
                discount: updatedOrder.discount,
                walletDiscount: 0,
                promoCodeDiscount: 0,
                prepaidDiscount: 0,
                paymentMode: 2,
                paymentGateway: "",
                shippingMethod: 1,
                packageWeight: updatedOrder.packageWeight,
                packageHeight: updatedOrder.packageHeight,
                packageWidth: updatedOrder.packageWidth,
                packageLength: updatedOrder.packageLength,
                paymentTransactionId: updatedOrder.paymentTransactionId || "NA",
                orderStatus: 1,
                items: updatedOrder.items.map(item => ({
                    OrderItemId: item._id,
                    Sku: item.Sku,
                    productName: item.productName,
                    Quantity: item.Quantity,
                    Price: item.Price,
                    itemDiscount: item.itemDiscount
                })),
                customer: updatedOrder.customer
            };

            const easyResponse = await axios.post('https://api.easyecom.io/webhook/v2/createOrder', easyEcomOrderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log(easyResponse);

            // Send confirmation email to the customer
            await sendOrderConfirmationEmail(userEmail, 'Order Confirmation', customerEmailContent);

            // Send acknowledgment email to the seller (replace with actual seller email)
            const sellerEmail = process.env.SELLER_EMAIL;
            await sendOrderConfirmationEmail(sellerEmail, 'New Order Received', sellerEmailContent);
        }

        // Respond with the updated order
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};


// Delete an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (order) {
            res.status(200).json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
