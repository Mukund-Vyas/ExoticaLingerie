import React from 'react'
import TextBlockWithSubItem from '../PrivacyPolicy/PrivacyPolicyComponents/TextBlockWithSubItem'

const ReturnPolicyPage = () => {
    const data = [
        {
            no: "1",
            title: "Eligibility for Returns",
            subTabs: [
                {
                    no: "1",
                    heading: "Time Frame:",
                    description: "Returns must be initiated within 30 days of the purchase date."
                },
                {
                    no: "2",
                    heading: "Condition:",
                    description: "Items must be unworn, unwashed, and in their original condition with all tags and packaging intact."
                },
                {
                    no: "3",
                    heading: "Exceptions:",
                    description: "For hygiene reasons, certain items such as panties, bodysuits, and swimwear are not eligible for return unless they are defective or damaged."
                },
            ]
        },
        {
            no: "2",
            title: "Return Process",
            subTabs: [
                {
                    no: "1",
                    heading: "Request a Return:",
                    description: "Contact our customer service team via email at support@exoticalingerie.com to request a return authorization."
                },
                {
                    no: "2",
                    heading: "Prepare Your Package:",
                    description: "Repack the item securely in its original packaging, including all tags and labels."
                },
                {
                    no: "3",
                    heading: "Shipping:",
                    description: "You will receive a prepaid return shipping label. Attach this label to your package and drop it off at your nearest shipping location."
                },
            ]
        },
        {
            no: "3",
            title: "Refunds",
            subTabs: [
                {
                    no: "1",
                    heading: "Processing Time:",
                    description: "Once we receive your return, we will inspect the item and process your refund within 7-10 business days."
                },
                {
                    no: "2",
                    heading: "Refund Method:",
                    description: " Refunds will be issued to the original payment method. Please note that it may take additional time for the refund to appear on your account, depending on your bank or credit card issuer."
                },
                {
                    no: "3",
                    heading: "Shipping Costs:",
                    description: " Original shipping costs are non-refundable unless the return is due to a defect or error on our part."
                },
            ]
        },
        {
            no: "4",
            title: "Exchanges",
            subTabs: [
                {
                    no: "1",
                    heading: "Availability:",
                    description: " If you need a different size or color, please follow the return process and place a new order for the desired item."
                },
                {
                    no: "2",
                    heading: "Defective Items:",
                    description: "If you receive a defective or damaged item, contact our customer service immediately for assistance with an exchange or refund."
                },
            ]
        },
        {
            no: "5",
            title: "Final Sale Items",
            subTabs: [
                {
                    no: "1",
                    heading: "Non-Returnable:",
                    description: "Items marked as 'Final Sale' are not eligible for return or exchange unless they arrive damaged or defective."
                },
            ]
        },
        {
            no: "6",
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
                    <h1 className=' text-[36px] font-semibold'>Product Return Policy for Exotica Lingerie</h1>
                </div>
                <hr className='mt-2 bg-black h-[2px]' />
                <div className=' mt-4 flex flex-col gap-4'>
                    <div className=''>
                        <p className='description text-justify'>
                            At Exotica Lingerie, we strive to provide high-quality products and excellent customer service. If you are not entirely satisfied with your purchase, our return policy is designed to ensure a smooth and hassle-free return process.
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

export default ReturnPolicyPage