import React from 'react'
import TextBlockWithSubItem from '../PrivacyPolicy/PrivacyPolicyComponents/TextBlockWithSubItem'

const TermsOfUsePage = () => {
  const data = [
    {
      no: "1",
      title: "Introduction",
      subTabs: [
        {
          no: "1.1",
          heading: "Company Information:",
          description: "Exotica Lingerie is a registered trademark and operates under the laws applicable in its jurisdiction."
        },
        {
          no: "1.2",
          heading: "Acceptance of Terms:",
          description: "By using our website, you agree to comply with and be bound by these terms and conditions."
        },
      ]
    },
    {
      no: "2",
      title: "Use of the Website",
      subTabs: [
        {
          no: "2.1",
          heading: "Eligibility:",
          description: "You must be at least 18 years old to use our website or make a purchase."
        },
        {
          no: "2.2",
          heading: "Account Security:",
          description: "You are responsible for maintaining the confidentiality of your account information, including your password. You agree to accept responsibility for all activities that occur under your account."
        },
      ]
    },
    {
      no: "3",
      title: "Products and Orders",
      subTabs: [
        {
          no: "3.1",
          heading: "Product Descriptions:",
          description: "We strive to provide accurate descriptions and images of our products. However, we do not guarantee that the descriptions and images are complete or error-free."
        },
        {
          no: "3.2",
          heading: "Order Acceptance:",
          description: "All orders are subject to acceptance by Exotica Lingerie. We reserve the right to refuse or cancel any order at our discretion."
        },
      ]
    },
    {
      no: "4",
      title: "Pricing and Payment",
      subTabs: [
        {
          no: "4.1",
          heading: "Pricing:",
          description: "All prices are listed in INR(Indian Rupee) and are subject to change without notice. We are not responsible for typographical errors."
        },
        {
          no: "4.2",
          heading: "Payment Methods:",
          description: "We accept various payment methods, including credit cards, debit cards, Net Banking and UPI. Payment must be received before your order is processed."
        },
      ]
    },
    {
      no: "5",
      title: "Shipping and Delivery",
      subTabs: [
        {
          no: "5.1",
          heading: "Shipping Policy:",
          description: "Please refer to our Shipping Policy for detailed information on shipping methods, costs, and delivery times."
        },
        {
          no: "5.2",
          heading: "Delivery Times:",
          description: "Estimated delivery times are provided for convenience and are not guaranteed. Delays may occur due to factors beyond our control."
        },
      ]
    },
    {
      no: "6",
      title: "Returns and Exchanges",
      subTabs: [
        {
          no: "6.1",
          heading: "Return Policy:",
          description: "Please refer to our Return Policy for information on how to return or exchange products."
        },
        {
          no: "6.2",
          heading: "Non-Returnable Items:",
          description: "Certain items, such as panties, bodysuits, and swimwear, are not eligible for return due to hygiene reasons."
        },
      ]
    },
    {
      no: "7",
      title: "Privacy and Security",
      subTabs: [
        {
          no: "7.1",
          heading: "Privacy Policy:",
          description: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information."
        },
        {
          no: "7.2",
          heading: "Security Measures:",
          description: "We implement security measures to protect your information. However, we cannot guarantee absolute security."
        },
      ]
    },
    {
      no: "8",
      title: "Intellectual Property",
      subTabs: [
        {
          no: "8.1",
          heading: "Ownership:",
          description: "All content on this website, including text, graphics, logos, images, and software, is the property of Exotica Lingerie or its content suppliers and is protected by intellectual property laws."
        },
        {
          no: "8.2",
          heading: "Use Restrictions:",
          description: "You may not reproduce, distribute, or otherwise use any content from this website without our express written permission."
        },
      ]
    },
    {
      no: "9",
      title: "Limitation of Liability",
      subTabs: [
        {
          no: "9.1",
          heading: "Disclaimer:",
          description: "To the fullest extent permitted by law, Exotica Lingerie disclaims all warranties, express or implied, regarding the use of our website and products."
        },
        {
          no: "9.2",
          heading: "Liability:",
          description: "Exotica Lingerie shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products."
        },
      ]
    },
    {
      no: "10",
      title: "Governing Law",
      subTabs: [
        {
          no: "10.1",
          heading: "Jurisdiction:",
          description: "These terms and conditions are governed by the laws of the jurisdiction in which Exotica Lingerie operates. Any disputes shall be resolved in the courts of that jurisdiction."
        },
      ]
    },
    {
      no: "11",
      title: "Changes to Terms and Conditions",
      subTabs: [
        {
          no: "11.1",
          heading: "Modifications:",
          description: "Exotica Lingerie reserves the right to modify these terms and conditions at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the modified terms."
        },
      ]
    },
    {
      no: "12",
      title: "Contact Information",
      subTabs: [
        {
          no: "12.1",
          heading: "Customer Service:",
          description: "For any questions or concerns regarding these terms and conditions, please contact us at support@exoticalingerie.in."
        },
      ]
    },
    {
      description: "Thank you for shopping with Exotica Lingerie!",
    },
  ]
  return (
    <div className=' bg-gradient-to-b from-[#ffd9ea] to-[#fdf2f8]'>
      <div className='container max-w-screen-lg mx-auto py-8 p-2'>
        <div>
          <h1 className='text-4xl font-medium mb-1 font-serif max-sm:text-2xl'>Terms and Conditions for Exotica Lingerie</h1>
          <p className='text-gray-600'>With effective from 1 August 2024</p>
        </div>
        <hr className='mt-2 border-slate-500' />
        <div className=' mt-4 flex flex-col gap-4 text-pretty'>
          <div className=''>
            <p className='description text-justify'>
              Welcome to Exotica Lingerie. These terms and conditions outline the rules and regulations
              for the use of our website and services. By accessing this website and making a purchase, you
              accept these terms and conditions in full. If you disagree with any part of these terms and
              conditions, please do not use our website.
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

export default TermsOfUsePage