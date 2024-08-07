import React from 'react'
import TextBlockWithSubItem from './PrivacyPolicyComponents/TextBlockWithSubItem'

const PrivacyPolicyPage = () => {
    const data = [
        {
            title: "Information We Collect",
            description: "We may collect various types of information from you, including:",
            subTabs: [
                {
                    no: "1",
                    heading: "Personal Information:",
                    description: "This may include your name, email address, phone number, shipping address, and payment information when you make a purchase."
                },
                {
                    no: "2",
                    heading: "Non-Personal Information:",
                    description: "We may collect non-personal information such as your IP address, browser type, referring website, and pages visited to improve our website and services."
                },
            ]
        },
        {
            title: "How We Use Your Information",
            description: "We use the information we collect for the following purposes:",
            subTabs: [
                {
                    no: "1",
                    heading: "To Fulfill Orders:",
                    description: "To process and fulfill your orders, communicate with you about your purchase, and provide customer support"
                },
                {
                    no: "2",
                    heading: "To Improve Our Services:",
                    description: "To analyze trends, track user activities, and gather demographic information to improve our products and services."
                },
                {
                    no: "3",
                    heading: "To Communicate with You:",
                    description: "To send you promotional emails about new products, special offers, or other information we think you may find interesting."
                },
            ]
        },
        {
            title: "Information Sharing",
            description: "We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide you with advance notice. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential."
        },
        {
            title: "Data Security",
            description: "We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.",
            subTabs: [
                {
                    no: "1",
                    heading: "Importance of Security:",
                    description: "Your information is stored in secure networks accessible only by authorized personnel who require it for the purposes outlined in our Privacy Policy. These individuals are obligated to maintain confidentiality."
                },
                {
                    no: "2",
                    heading: "Access Control:",
                    description: "To analyze trends, track user activities, and gather demographic information to improve our products and services."
                },
                {
                    no: "3",
                    heading: "Limitations and Acknowledgment:",
                    description: "Despite our efforts to secure your information, we cannot guarantee absolute security. You acknowledge that complete security is not possible and agree not to hold us responsible for breaches or unauthorized actions beyond our control, such as government actions, hacking, or other security incidents."
                },
            ]
        },
        {
            title: "Cookies",
            description: "We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future."
        },
        { 
            title: "Fraud Prevention Notice",
            description: "CUSTOMERS, GENERAL PUBLIC AND PROSPECTIVE CUSTOMERS ARE HEREBY CAUTIONED",
            subTabs:[
                {
                    no: "1",
                    heading: "Official Communication Channels:",
                    description: "Exotica Lingerie communicates with its customers through official channels only, including our website (www.exoticalingerie.in), official social media accounts, and authorized email addresses. Be wary of communication from unofficial sources."
                },
                {
                    no: "2",
                    heading: "Gift Schemes:",
                    description: "Exotica Lingerie does not conduct unsolicited gift schemes or promotions through unofficial channels. If you receive any communication claiming to be from Exotica Lingerie with such offers, please verify its authenticity through our official channels before taking any action."
                },
                {
                    no: "3",
                    heading: "Protect Your Personal Information:",
                    description: "Exotica Lingerie will never ask for sensitive personal information such as passwords, credit card details, or bank account information through unsolicited communications. Avoid sharing such information with anyone claiming to represent Exotica Lingerie outside our official platforms."
                },
                {
                    no: "4",
                    heading: "Verify Promotions:",
                    description: "Official promotions and offers from Exotica Lingerie are always announced through our official website and social media channels. If in doubt, please check our official channels or contact our customer support for verification."
                },
                {
                    no: "5",
                    heading: "Report Suspicious Activity:",
                    description: "Exotica Lingerie does not conduct unsolicited gift schemes or promotions through unofficial channels. If you receive any communication claiming to be from Exotica Lingerie with such offers, please verify its authenticity through our official channels before taking any action."
                },
                {
                    heading: "",
                    description: "At Exotica Lingerie, we are committed to providing a secure and trustworthy shopping experience. We appreciate your cooperation in helping us maintain the integrity of our brand and protect our customers from potential scams."
                },
                {
                    heading: "",
                    description: "Before dealing with such fraudsters and/or responding/accessing any fraudulent advertisements, telephone calls, emails and website, to protect yourself against any fraud and criminal acts of the perpetrators, you are advised to act responsibly and are solely obliged to verify by reaching out to the Official customer care number of Exotica Lingerie the veracity of such claims from the Company’s official website www.exoticalingerie.in."
                },
                {
                    heading: "",
                    description: "General Public and prospective customers are also advised to immediately report any suspicious incident and/or incident of defrauding of money as a result of these fraudulent acts."
                }
            ]
        },
        {
            title: "Your Consent",
            description: "By using our site, you consent to our website privacy policy."
        },
        {
            title: "Changes to Our Privacy Policy",
            description: "If we decide to change our privacy policy, we will post those changes on this page."
        },
        {
            title: "Contacting Us",
            description: "If there are any questions regarding this privacy policy, you may contact us using the information below:",
            address: {
                name: "Exotica Lingerie",
                addr1: "108, Shriji Nagar - 2, Opp. Mad Over Grill, Ved Road",
                city: "Surat",
                state: "Gujarat",
                zip: "395004",
                email: "support@exoticalingerie.in",
                phone: "+91 9978705400"
            }
        },
        // {
        //     description: "This privacy policy template covers the basic aspects relevant to Exotica Lingerie's operations. Make sure to customize it further based on specific legal requirements and the unique aspects of your business practices."
        // },
        // {
        //     title: "Product Return Policy for Exotica Lingerie",
        //     description: "At Exotica Lingerie, we strive to provide high-quality products and excellent customer service. If you are not entirely satisfied with your purchase, our return policy is designed to ensure a smooth and hassle-free return process."
        // },
        // {
        //     no: "1",
        //     title: "Eligibility for Returns",
        //     subTabs: [
        //         {
        //             heading: " Time Frame:",
        //             description: "Your information is stored in secure networks accessible only by authorized personnel who require it for the purposes outlined in our Privacy Policy. These individuals are obligated to maintain confidentiality."
        //         },
        //         {
        //             heading: " Condition:",
        //             description: "To analyze trends, track user activities, and gather demographic information to improve our products and services."
        //         },
        //         {
        //             heading: " Exceptions:",
        //             description: "Despite our efforts to secure your information, we cannot guarantee absolute security. You acknowledge that complete security is not possible and agree not to hold us responsible for breaches or unauthorized actions beyond our control, such as government actions, hacking, or other security incidents."
        //         },
        //     ]
        // },
        // {
        //     no: "2",
        //     title: "Return Process",
        //     subTabs: [
        //         {
        //             heading: " Request a Return:",
        //             description: "Contact our customer service team via email at returns@exoticalingerie.com or call us at 1-800-123-4567 to request a return authorization."
        //         },
        //         {
        //             heading: " Prepare Your Package:",
        //             description: "Repack the item securely in its original packaging, including all tags and labels."
        //         },
        //         {
        //             heading: " Shipping:",
        //             description: "You will receive a prepaid return shipping label. Attach this label to your package and drop it off at your nearest shipping location."                
        //         },
        //     ]
        // },
        // {
        //     no: "3",
        //     title: "Refunds",
        //     subTabs: [
        //         {
        //             heading: " Processing Time:",
        //             description: "Once we receive your return, we will inspect the item and process your refund within 7-10 business days."
        //         },
        //         {
        //             heading: " Refund Method:",
        //             description: "Refunds will be issued to the original payment method. Please note that it may take additional time for the refund to appear on your account, depending on your bank or credit card issuer."
        //         },
        //         {
        //             heading: " Shipping Costs:",
        //             description: "Original shipping costs are non-refundable unless the return is due to a defect or error on our part."
        //         },
        //     ]
        // },
        // {
        //     no: "4",
        //     title: "Exchanges",
        //     subTabs: [
        //         {
        //             heading: " Availability:",
        //             description: "If you need a different size or color, please follow the return process and place a new order for the desired item."
        //         },
        //         {
        //             heading: " Defective Items:",
        //             description: "If you receive a defective or damaged item, contact our customer service immediately for assistance with an exchange or refund."
        //         }
        //     ]
        // },
        // {
        //     no: "5",
        //     title: "Final Sale Items",
        //     subTabs: [
        //         {
        //             heading: " Non-Returnable:",
        //             description: "Items marked as &quot;Final Sale&quot; are not eligible for return or exchange unless they arrive damaged or defective."
        //         }
        //     ]
        // },
        // {
        //     no: "6",
        //     title: "Contact Us",
        //     description: "For any questions or concerns regarding your return, please reach out to our customer service team at returns@exoticalingerie.com or 1-800-123-4567. We are here to assist you and ensure your satisfaction with our products."
        // },
        // {
        //     description: "Thank you for shopping with Exotica Lingerie!"
        // }
    ]
    
    return (
        <div className=' bg-gradient-to-b from-[#ffd9ea] to-[#fdf2f8]'>
            <div className='container max-w-screen-lg mx-auto py-8'>
                <div>
                    <h1 className=' text-[36px] font-semibold'>Privacy Policy for Exotica Lingerie</h1>
                    <p>Effective Date: 1 August 2024</p>
                </div>
                <hr className='mt-2 bg-black h-[2px]' />
                <div className=' mt-4 flex flex-col gap-4'>
                    <div className=''>
                        <p className='description text-justify'>
                            Thank you for visiting Exotica Lingerie. Your privacy is important to us, and we are
                            committed to protecting the information you share with us. This Privacy Policy outlines how
                            we collect, use, and safeguard your personal information when you visit our website or
                            interact with us in other ways. By accessing Exotica Lingerie or providing your information
                            to us, you consent to the practices described in this policy.
                        </p>
                    </div>
                    {
                        data?.map((item, index) => (
                            <TextBlockWithSubItem key={index} data={item} />
                        ))
                    }

                    <div>
                        <h1 className=' text-[36px] font-semibold'>Fraud Prevention Notice</h1>
                    </div>
                    <hr className='mt-2 bg-black h-[2px]' />
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicyPage