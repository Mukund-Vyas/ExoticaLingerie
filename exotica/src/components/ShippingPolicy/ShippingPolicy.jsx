import React from 'react'
import TextBlockWithSubItem from '../PrivacyPolicy/PrivacyPolicyComponents/TextBlockWithSubItem'

const ShippingPolicy = () => {
    const data = [
      {
            title: "General",
            description: "",
            subTabs: [
                {
                    no: "1",
                    heading: "",
                    description: "Hiral Enterprise, with its registered office located at 108, Shriji Nagar - 2, Opp. Mad Over Grill, Ved Road, Surat - 395004, (“Hiral Enterprise”, “we”, “us” or “our”) operates the mobile application/website www.exoticalingerie.in (referred to as the “Exotica Lingerie Platform”). Through this platform, we offer a curated selection of women’s intimate wear, including bras, panties, sleepwear, activewear, shapewear, and more (“Products”). Our mission is to provide high-quality, comfortable, and stylish products to our Users (“User” or “Users” or “you” or “your”), ensuring an exceptional shopping experience."
                },
                {
                    no: "2",
                    heading: "",
                    description: "This Shipping Policy (“Policy”), together with our Terms of Service, governs your use of the Exotica Lingerie Platform and outlines our practices regarding the processing, handling, and delivery of your orders. By accessing or using the Exotica Lingerie Platform, you agree to the terms described in this Policy."
                },
            ]
        },  
      {
          no: "1",
          title: "Shipping Destinations",
          subTabs: [
            {
              no: "1.1",
              heading: "Domestic Shipping:",
              description: "We offer shipping within India."
            },
            {
              no: "1.2",
              heading: "International Shipping:",
              description: "We also ship to select international destinations. Please check our website or contact customer service for more information on international shipping availability and rates."
            },
          ]
        },
        {
          no: "2",
          title: "Shipping Methods and Delivery Times",
          subTabs: [
            {
              no: "2.1",
              heading: "Standard Shipping:",
              description: "Delivery Time: 5-7 business days, Cost: ₹49* (free for orders over ₹999 within the India)"
            },
            {
              no: "2.2",
              heading: "Expedited Shipping:",
              description: "Delivery Time: 2-3 business days, Cost: ₹79*"
            },
            {
                no: "2.3",
                heading: "Overnight Shipping:",
                description: "Delivery Time: 1 business day, Cost: ₹149*"
            },
            {
                heading: "*Note:",
                description: "Delivery times are estimates and may vary based on your location and other factors beyond our control."
            }
          ]
        },
        {
          no: "3",
          title: "Order Processing",
          subTabs: [
            {
              no: "3.1",
              heading: "Processing Time:",
              description: "Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day."
            },
            {
              no: "3.2",
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
              no: "4.1",
              heading: "Shipping Confirmation:",
              description: "Once your order has shipped, you will receive a shipping confirmation email with a tracking number."
            },
            {
              no: "4.2",
              heading: "Tracking Your Order:",
              description: "Use the tracking number provided to monitor the status of your shipment. You can track your order on our website or the carrier's website."
            },
          ]
        },
        {
          no: "5",
          title: "Shipping Costs",
          subTabs: [
            {
              no: "5.1",
              heading: "Domestic Shipping:",
              description: "Costs vary based on the shipping method selected. Standard shipping is free for orders over ₹999 within India."
            },
            {
              no: "5.1",
              heading: "International Shipping:",
              description: "Costs are calculated at checkout based on the destination and shipping method selected. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the customer."
            },
          ]
        },
        {
          no: "6",
          title: "Address Accuracy",
          subTabs: [
            {
              no: "6.1",
              heading: "Accuracy:",
              description: "Please ensure that your shipping address is complete and accurate to avoid delays or misdelivery. Exotica Lingerie is not responsible for packages delivered to incorrect addresses provided by the customer."
            },
          ]
        },
        {
            no: "7",
            title: "Lost or Damaged Packages",
            subTabs: [
              {
                no: "7.1",
                heading: "Lost Packages:",
                description: "If your package is lost in transit, please contact our customer service team at support@exoticalingerie.in. We will work with the carrier to locate your package or arrange for a replacement."
              },
              {
                no: "7.2",
                heading: "Damaged Packages:",
                description: "If your package arrives damaged, please retain all packaging materials and contact us immediately. We will assist you with a claim and arrange for a replacement if necessary."
              },
            ]
          },
        {
          no: "7",
          title: "Contact Us",
          description: "For any questions or concerns regarding shipping, please reach out to our customer service team at support@exoticalingerie.in. We are here to help and ensure your shopping experience with Exotica Lingerie is exceptional.",
          subTabs: [
            {
              description: "Thank you for shopping with Exotica Lingerie!"
            },
          ]
        },
        
      ]
      return (
        <div className=' bg-gradient-to-b from-[#ffd9ea] to-[#fdf2f8]'>
          <div className='container max-w-screen-lg mx-auto py-8 p-2'>
            <div>
              <h1 className=' text-4xl font-medium mb-1 font-serif max-sm:text-2xl'>Shipping Policy for Exotica Lingerie</h1>
              <p className='text-gray-600'>With effective from 1 August 2024</p>
            </div>
            <hr className='mt-2 border-slate-500' />
            <div className=' mt-4 flex flex-col gap-4 text-pretty'>
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