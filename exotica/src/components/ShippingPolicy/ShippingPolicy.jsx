import React from 'react'
import TextBlockWithSubItem from '../PrivacyPolicy/PrivacyPolicyComponents/TextBlockWithSubItem'

const ShippingPolicy = () => {
    const data = [
        {
          no: "1",
          title: "Shipping Destinations",
          subTabs: [
            {
              no: "1",
              heading: "Domestic Shipping:",
              description: "We offer shipping within the India."
            },
            {
              no: "2",
              heading: "International Shipping:",
              description: "We also ship to select international destinations. Please contact customer service for more information on international shipping availability and rates."
            },
          ]
        },
        {
          no: "2",
          title: "Shipping Methods and Delivery Times",
          subTabs: [
            {
              no: "1",
              heading: "Standard Shipping:",
              description: "Delivery Time: 5-7 business days <br /> Cost: ~ ₹70 (free for orders over ₹999 within the India)"
            },
            {
              no: "2",
              heading: "Expedited Shipping:",
              description: "Delivery Time: 2-3 business days <br /> Cost: ~ ₹150"
            },
            {
                no: "3",
                heading: "Overnight Shipping:",
                description: "Delivery Time: 1 business day <br /> Cost: ~ ₹300"
            },
            {
                heading: "Note:",
                description: "Delivery times are estimates and may vary based on your location and other factors beyond our control."
            }
          ]
        },
        {
          no: "3",
          title: "Order Processing",
          subTabs: [
            {
              no: "1",
              heading: "Processing Time:",
              description: "Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day."
            },
            {
              no: "2",
              heading: "Order Confirmation:",
              description: "Once your order is placed, you will receive an order confirmation email with details of your purchase."
            },
          ]
        },
        {
          no: "4",
          title: "Shipping Confirmation and Tracking",
          subTabs: [
            {
              no: "1",
              heading: "Shipping Confirmation:",
              description: " Once your order has shipped, you will receive a shipping confirmation email with a tracking number."
            },
            {
              no: "2",
              heading: "Tracking Your Order:",
              description: "Use the tracking number provided to monitor the status of your shipment. You can track your order on our website or the carrier’s website."
            },
          ]
        },
        {
          no: "5",
          title: "Address Accuracy",
          subTabs: [
            {
              no: "1",
              heading: "Accuracy:",
              description: "Please ensure that your shipping address is complete and accurate to avoid delays or misdelivery. Exotica Lingerie is not responsible for packages delivered to incorrect addresses provided by the customer."
            },
          ]
        },
        {
            no: "6",
            title: "Lost or Damaged Packages",
            subTabs: [
              {
                no: "1",
                heading: "Lost Packages:",
                description: "If your package is lost in transit, please contact our customer service team at support@exoticalingerie.com. We will work with the carrier to locate your package or arrange for a replacement."
              },
              {
                no: "2",
                heading: "Damaged Packages:",
                description: "If your package arrives damaged, please retain all packaging materials and contact us immediately. We will assist you with a claim and arrange for a replacement if necessary."
              },
            ]
          },
        {
          no: "7",
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
              <h1 className=' text-[36px] font-semibold'>Shipping Policy for Exotica Lingerie</h1>
            </div>
            <hr className='mt-2 bg-black h-[2px]' />
            <div className=' mt-4 flex flex-col gap-4'>
              <div className=''>
                <p className='description text-justify'>
                    At Exotica Lingerie, we are committed to delivering your purchases quickly and efficiently. Our shipping policy outlines the details of our shipping processes to ensure a smooth experience for our customers.
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

export default ShippingPolicy