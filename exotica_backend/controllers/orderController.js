const { sendOrderConfirmationEmail } = require('../utils/otpmailer');
const Order = require('../models/ordersModel');
const User = require('../models/userModel');
const Product = require('../models/ProductModel');
const transactionModel = require('../models/transactionModel');
const { default: axios } = require('axios');
const { getEasyEcomAuthToken, fetchTrackingDetails } = require('../utils/easyEcomUtils');

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
            const orderDate = new Date(Date.now()).toISOString();
            const expDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

            let easyEcomOrderData = {
                orderType: "retailorder",
                marketplaceId: 832,
                orderNumber: savedOrder.orderNumber,
                orderTotal: parseFloat(savedOrder.orderTotal),
                orderDate: orderDate, // You can use the appropriate date here
                expDeliveryDate: expDeliveryDate, // Example: 7 days from now
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
                codCharges: 29,
                paymentTransactionId: savedOrder.paymentTransactionId || "NA",
                orderStatus: 1,
                items: savedOrder.items.map(item => ({
                    OrderItemId: item.OrderItemId,
                    Sku: item.Sku,
                    productName: item.productName,
                    Quantity: item.Quantity,
                    Price: parseFloat(item.Price),
                    itemDiscount: parseFloat(item.itemDiscount),
                })),
                customer: [savedOrder.customer]
            };
            console.log(easyEcomOrderData);

            try {
                let easyResponse = await axios.post('https://api.easyecom.io/webhook/v2/createOrder', easyEcomOrderData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                const responseData = easyResponse.data;
                if (responseData.code !== 200) {
                    console.error("Error creating order on EasyEcom:", responseData.message, responseData.data);

                    // Handle the error based on the content of the response
                    return res.status(400).json({
                        message: "Failed to create order on EasyEcom",
                        error: responseData.message,
                        details: responseData.data
                    });
                }

                console.log(easyResponse.data);
                console.log(easyResponse.data.data[0]);

                let productDetails = '';
                savedOrder.items.forEach(item => {
                    productDetails += `
                        <div>
                            <p>Product Name: ${item.productName}</p>
                            <p>Product SKU: ${item.Sku}</p>
                            <p>Quantity: ${item.Quantity}</p>
                            <p>Price: ₹${item.Price.toFixed(2)}</p>
                            <p>Item Discount: ₹${item.itemDiscount}</p>
                            <p>Total: ₹${(item.Quantity * (item.Price - item.itemDiscount)).toFixed(2)}</p>
                            <hr>
                        </div>
                    `;
                });

                let productDetailsCustomer = '';
                savedOrder.items.forEach(item => {
                    productDetailsCustomer += `
                        <div>
                            <p>Product Name: ${item.productName}</p>
                            <p>Quantity: ${item.Quantity}</p>
                            <p>Total: ₹${(item.Quantity * (item.Price - item.itemDiscount)).toFixed(2)}</p>
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
                                <img src="https://www.dropbox.com/scl/fi/xwki7x87huxtxeoid9qdz/2.png?rlkey=d6zinjiskrxa8pbygdwxbcebp&st=0zkf2ltk&raw=1" alt="Exotica Lingerie">
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
                                        <p><span class="highlight">Total Amount:</span> ₹${savedOrder.orderTotal.toFixed(2)}</p>
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
                sendOrderConfirmationEmail(userEmail, 'Order Confirmation', customerEmailContent);

                // Send acknowledgment email to the seller (replace with actual seller email)
                // const sellerEmail = 'cr.cait2020@gmail.com';
                const sellerEmail = process.env.SELLER_EMAIL;
                sendOrderConfirmationEmail(sellerEmail, 'New Order Received', sellerEmailContent);
            } catch (apiError) {
                console.error("Error creating order on EasyEcom:", apiError.response?.data || apiError.message);

                // Handle 4xx errors specifically
                if (apiError.response && apiError.response.status >= 400 && apiError.response.status < 500) {
                    return res.status(apiError.response.status).json({
                        message: "Failed to create order on EasyEcom",
                        error: apiError.response.data
                    });
                } else {
                    // Handle other errors (e.g., network issues)
                    return res.status(500).json({
                        message: "An error occurred while creating the order on EasyEcom",
                        error: apiError.message
                    });
                }
            }
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
                        <p>Price: ₹${item.Price.toFixed(2)}</p>
                        <p>Item Discount: ₹${item.itemDiscount}</p>
                        <p>Total: ₹${(item.Quantity * (item.Price - item.itemDiscount)).toFixed(2)}</p>
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
                        <p>Total: ₹${(item.Quantity * (item.Price - item.itemDiscount)).toFixed(2)}</p>
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
                            <p><span class="highlight">Order Number:</span> ${updatedOrder.paymentTransactionId || "COD"}</p>
                            <p><span class="highlight">Order Date:</span> ${updatedOrder.orderDate}</p>
                            <p><span class="highlight">Expected Delivery Date:</span> ${updatedOrder.expDeliveryDate}</p>
                            
                            <div class="order-summary">
                                <h2>Order Summary</h2>
                                <div>
                                    <p><span class="highlight">Total Amount:</span> ₹${updatedOrder.orderTotal.toFixed(2)}</p>
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

            const orderDate = new Date(Date.now()).toISOString();
            const expDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
            // Create order on EasyEcom
            let easyEcomOrderData = {
                orderType: "retailorder",
                marketplaceId: 832,
                orderNumber: updatedOrder.orderNumber,
                orderTotal: parseFloat(updatedOrder.orderTotal),
                orderDate: orderDate,
                expDeliveryDate: expDeliveryDate,
                shippingCost: parseFloat(updatedOrder.shippingCost),
                discount: parseFloat(updatedOrder.discount),
                walletDiscount: 0,
                promoCodeDiscount: 0,
                prepaidDiscount: 0,
                paymentMode: 5,
                paymentGateway: "Phonepe",
                shippingMethod: 3,
                packageWeight: 250,
                packageHeight: 2,
                packageWidth: 4,
                packageLength: 7,
                paymentTransactionId: updatedOrder.paymentTransactionId || "NA",
                orderStatus: 1,
                items: updatedOrder.items.map(item => ({
                    OrderItemId: item.OrderItemId,
                    Sku: item.Sku,
                    productName: item.productName,
                    Quantity: item.Quantity,
                    Price: parseFloat(item.Price),
                    itemDiscount: parseFloat(item.itemDiscount),
                })),
                customer: [updatedOrder.customer],
            };

            try {
                const easyResponse = await axios.post('https://api.easyecom.io/webhook/v2/createOrder', easyEcomOrderData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                const responseData = easyResponse.data;
                if (responseData.code !== 200) {
                    console.error("Error creating order on EasyEcom:", responseData.message, responseData.data);

                    // Handle the error based on the content of the response
                    return res.status(400).json({
                        message: "Failed to create order on EasyEcom",
                        error: responseData.message,
                        details: responseData.data
                    });
                }

                console.log(easyResponse.data);
                console.log(easyResponse.data.data[0]);

                // Send confirmation email to the customer
                sendOrderConfirmationEmail(userEmail, 'Order Confirmation', customerEmailContent);

                // Send acknowledgment email to the seller (replace with actual seller email)
                const sellerEmail = process.env.SELLER_EMAIL;
                sendOrderConfirmationEmail(sellerEmail, 'New Order Received', sellerEmailContent);
            } catch (apiError) {
                console.error("Error creating order on EasyEcom:", apiError.response?.data || apiError.message);

                // Handle 4xx errors specifically
                if (apiError.response && apiError.response.status >= 400 && apiError.response.status < 500) {
                    return res.status(apiError.response.status).json({
                        message: "Failed to create order on EasyEcom",
                        error: apiError.response.data
                    });
                } else {
                    // Handle other errors (e.g., network issues)
                    return res.status(500).json({
                        message: "An error occurred while creating the order on EasyEcom",
                        error: apiError.message
                    });
                }
            }
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

// Utility function to convert decimals to float
const convertDecimal128ToFloat = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(item => convertDecimal128ToFloat(item));
    } else if (obj && typeof obj === 'object') {
        if (obj instanceof Date) {
            return obj; // Preserve Date objects
        }
        return Object.keys(obj).reduce((acc, key) => {
            if (obj[key] && obj[key]._bsontype === 'Decimal128') {
                acc[key] = parseFloat(obj[key].toString()); // Convert to float
            } else if (typeof obj[key] === 'object') {
                acc[key] = convertDecimal128ToFloat(obj[key]);
            } else {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    }
    return obj;
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId });

        if (orders.length > 0) {
            // Convert Decimal128 values to float
            const ordersWithConvertedDecimals = orders.map(order => convertDecimal128ToFloat(order.toObject()));

            // Extract all SKUs from the orders
            const skus = ordersWithConvertedDecimals.flatMap(order => order.items.map(item => item.Sku));
            // console.log('All SKUs from orders:', skus);

            const uniqueSkus = [...new Set(skus)]; // Remove duplicates

            // Fetch products containing the SKUs in any of their variations
            const products = await Product.find({ 'variations.SKU': { $in: uniqueSkus } });
            // console.log("Products", products);

            // Create a map for quick lookup of SKU to image
            const productMap = new Map();
            products.forEach(product => {
                product.variations.forEach(variation => {
                    if (uniqueSkus.includes(variation.SKU)) {
                        const image = variation.imageUrls && variation.imageUrls.length > 0 ? variation.imageUrls[0] : null;
                        productMap.set(variation.SKU, image);
                    }
                });
            });

            // Function to add product images and tracking details to order items
            const addProductImagesAndTrackingToOrders = async (orders) => {
                return Promise.all(orders.map(async (order) => {
                    const trackingDetails = await fetchTrackingDetails(order.orderNumber); // Fetch tracking details
                    // console.log(trackingDetails);
                    const refinedTracking = trackingDetails && Object.keys(trackingDetails).length > 0
                        ? {
                            awbNumber: trackingDetails.awbNumber,
                            currentShippingStatus: trackingDetails.currentShippingStatus,
                            shippingHistory: trackingDetails.shippingHistory2 || [],
                            carrierName: trackingDetails.carrierName,
                            orderStatus: trackingDetails.orderStatus,
                            orderDate: trackingDetails.orderDate,
                            expectedDeliveryDate: trackingDetails.expectedDeliveryDate,
                            customer_name: trackingDetails.customer_name,
                            customer_mobile_num: trackingDetails.customer_mobile_num,
                            city: trackingDetails.city,
                            state: trackingDetails.state,
                            pin_code: trackingDetails.pin_code,
                        }
                        : null;

                    // console.log(refinedTracking);

                    return {
                        orderNumber: order.orderNumber,
                        orderDate: order.orderDate,
                        orderTotal: order.orderTotal,
                        orderType: order.orderType,
                        orderStatus: order.orderStatus,
                        expDeliveryDate: order.expDeliveryDate,
                        items: order.items.map(item => ({
                            Sku: item.Sku,
                            quantity: item.Quantity,
                            productImage: productMap.get(item.Sku) || null,
                            productName: item.productName
                        })),
                        trackingDetails: refinedTracking || null
                    };

                }));
            };
            const ordersWithDetails = await addProductImagesAndTrackingToOrders(ordersWithConvertedDecimals);
            console.log(ordersWithDetails);

            res.status(200).json(ordersWithDetails);
        } else {
            res.status(404).json({ message: 'No orders found for this user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get Order Tracking Details 
// exports.getOrderTrackingDetails = async (req, res) => {
//     const orderNumber = req.params.orderNumber;
//     try {
//         // Replace the double slashes and properly format the reference_code
//         const easyecomAPI = `https://api.easyecom.io/Carriers/getTrackingDetails?reference_code=${orderNumber}`;
//         const authToken = await getEasyEcomAuthToken();
//         // Make the API call to Easyecom
//         const response = await axios.get(easyecomAPI, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });

//         // Send Easyecom API response back to the client
//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error('Error fetching tracking details:', error);

//         // Handle errors and send error response
//         res.status(500).json({ message: 'Error fetching tracking details' });
//     }
// }

exports.getOrderTrackingDetails = async (req, res) => {
    console.log("comes for tracking");
    
    try {
        const { orderNumber } = req.params;
        const userId = req.user._id;

        // Fetch the order
        const order = await Order.findOne({ orderNumber, user: userId }).exec();

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Convert Decimal128 values to float
        const orderWithConvertedDecimals = convertDecimal128ToFloat(order.toObject());

        // Extract all SKUs from the order
        const skus = orderWithConvertedDecimals.items.map(item => item.Sku);
        const uniqueSkus = [...new Set(skus)]; // Remove duplicates

        // Fetch products containing the SKUs in any of their variations
        const products = await Product.find({ 'variations.SKU': { $in: uniqueSkus } }).exec();

        // Create a map for quick lookup of SKU to image
        const productMap = new Map();
        products.forEach(product => {
            product.variations.forEach(variation => {
                if (uniqueSkus.includes(variation.SKU)) {
                    const image = variation.imageUrls && variation.imageUrls.length > 0 ? variation.imageUrls[0] : null;
                    productMap.set(variation.SKU, image);
                }
            });
        });

        // Fetch tracking details
        const trackingDetails = await fetchTrackingDetails(order.orderNumber);

        const refinedTracking = trackingDetails && Object.keys(trackingDetails).length > 0
            ? {
                awbNumber: trackingDetails.awbNumber,
                currentShippingStatus: trackingDetails.currentShippingStatus,
                shippingHistory: trackingDetails.shippingHistory2 || [],
                carrierName: trackingDetails.carrierName,
                orderStatus: trackingDetails.orderStatus,
                orderDate: trackingDetails.orderDate,
                expectedDeliveryDate: trackingDetails.expectedDeliveryDate,
                customer_name: trackingDetails.customer_name,
                customer_mobile_num: trackingDetails.customer_mobile_num,
                city: trackingDetails.city,
                state: trackingDetails.state,
                pin_code: trackingDetails.pin_code,
            }
            : null;

        // Respond with order details
        res.status(200).json({
            orderNumber: orderWithConvertedDecimals.orderNumber,
            orderDate: orderWithConvertedDecimals.orderDate,
            orderTotal: orderWithConvertedDecimals.orderTotal,
            orderType: orderWithConvertedDecimals.orderType,
            orderStatus: orderWithConvertedDecimals.orderStatus,
            expDeliveryDate: orderWithConvertedDecimals.expDeliveryDate,
            items: orderWithConvertedDecimals.items.map(item => ({
                Sku: item.Sku,
                quantity: item.quantity,
                productImage: productMap.get(item.Sku) || null,
                productName: item.productName
            })),
            trackingDetails: refinedTracking || null
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};
