import React from 'react'
import TextBlockWithSubItem from '../PrivacyPolicy/PrivacyPolicyComponents/TextBlockWithSubItem'

const PaymentPolicyPage = () => {
    const data = [
        {
            no: "1",
            title: "Accepted Payment Methods",
            subTabs: [
                {
                    no: "1",
                    heading: "Credit Cards:",
                    description: "We accept major credit cards, including Visa, MasterCard, American Express, and Discover."
                },
                {
                    no: "2",
                    heading: "Debit Cards:",
                    description: "Debit cards with a Visa or MasterCard logo are accepted."
                },
                {
                    no: "3",
                    heading: "UPI:",
                    description: "Payments via Unified Payments Interface (UPI) are also accepted for a quick and easy checkout experience."
                },
                {
                    no: "4",
                    heading: "Other Payment Methods:",
                    description: "We also accept payments through other secure methods like Apple Pay and Google Pay."
                },
            ]
        },
        {
            no: "2",
            title: "Payment Security",
            subTabs: [
                {
                    no: "1",
                    heading: "Encryption:",
                    description: "All transactions are processed through a secure payment gateway that uses SSL encryption to protect your information."
                },
                {
                    no: "2",
                    heading: "Fraud Prevention:",
                    description: "We employ various measures to detect and prevent fraud. If we suspect any suspicious activity, we may contact you to verify the transaction."
                },
            ]
        },
        {
            no: "3",
            title: "Billing",
            subTabs: [
                {
                    no: "1",
                    heading: "Billing Information:",
                    description: "Ensure that your billing information is accurate and matches the information on your credit or debit card statement to avoid delays in processing your order."
                },
                {
                    no: "2",
                    heading: "Authorization:",
                    description: " By submitting your payment information, you authorize Exotica Lingerie to charge the applicable amount to your chosen payment method."
                },
                {
                    no: "3",
                    heading: "Payment Confirmation:",
                    description: " After your payment is processed, you will receive a confirmation email with details of your purchase.."
                },
            ]
        },
        {
            no: "4",
            title: "Payment Issues",
            subTabs: [
                {
                    no: "1",
                    heading: "Declined Transactions:",
                    description: "If your payment is declined, please check your payment information for accuracy or contact your bank for more details. You may also choose a different payment method."
                },
                {
                    no: "2",
                    heading: "Multiple Charges:",
                    description: "If you encounter multiple charges for the same order, please contact our customer service team immediately at support@exoticalingerie.com or 1-800-123-4567 for assistance."
                },
            ]
        },
        {
            no: "5",
            title: "Refunds",
            subTabs: [
                {
                    no: "1",
                    heading: "Refund Method:",
                    description: "Refunds will be issued to the original payment method used for the purchase."
                },
                {
                    no: "2",
                    heading: "Processing Time:",
                    description: "Refunds will be processed within 7-10 business days after we receive and inspect the returned item. It may take additional time for the refund to appear on your account, depending on your bank or credit card issuer."
                },
                {
                    no: "3",
                    heading: "Shipping Costs:",
                    description: "Original shipping costs are non-refundable unless the return is due to a defect or error on our part."
                },
            ]
        },
        {
            no: "6",
            title: "Currency",
            subTabs: [
                {
                    no: "1",
                    heading: "INR:",
                    description: "All transactions are processed in Indian Rupees (INR)."
                },
                {
                    no: "2",
                    heading: "Currency Conversion:",
                    description: " If you are making a purchase from outside the India, your credit card issuer or bank may charge a currency conversion fee. Please check with your financial institution for more information."
                },
            ]
        },
        {
            no: "7",
            title: "Taxes and Duties",
            subTabs: [
                {
                    no: "1",
                    heading: "Sales Tax:",
                    description: "Sales tax is applied to orders based on the shipping address and applicable state laws."
                },
                {
                    no: "2",
                    heading: "International Orders:",
                    description: "For international orders, customs duties, taxes, and fees may apply. These charges are the responsibility of the customer and are not included in the purchase price."
                },
            ]
        },
        {
            no: "8",
            title: "Contact Us",
            description: "For any questions or concerns regarding your return, please reach out to our customer service team at returns@exoticalingerie.com. We are here to assist you and ensure your satisfaction with our products.",
            subTabs: [
                {
                    description: "Thank you for shopping with Exotica Lingerie!"
                },
            ]
        },

    ]
    return (
        <div className=' bg-gradient-to-b from-[#ffd9ea] to-[#fdf2f8]'>
            <div className='container max-w-screen-lg mx-auto py-8'>
                <div>
                    <h1 className=' text-[36px] font-semibold'>Payment Policy for Exotica Lingerie</h1>
                </div>
                <hr className='mt-2 bg-black h-[2px]' />
                <div className=' mt-4 flex flex-col gap-4'>
                    <div className=''>
                        <p className='description text-justify'>
                        At Exotica Lingerie, we aim to provide a seamless and secure shopping experience. Our payment policy outlines the accepted payment methods, billing process, and other relevant details to ensure transparency and ease for our customers.
                        </p>
                    </div>
                    {
                        data?.map((item, index) => (
                            <TextBlockWithSubItem key={index} data={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PaymentPolicyPage