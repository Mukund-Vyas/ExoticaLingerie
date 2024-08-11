import React from 'react'
import TextBlockWithSubItem from './PrivacyPolicyComponents/TextBlockWithSubItem'

const PrivacyPolicyPage = () => {
    const data = [
        {
            no: "1",
            title: "General",
            description: "",
            subTabs: [
                {
                    no: "1.1",
                    heading: "",
                    description: "Hiral Enterprise, with its registered office located at 108, Shriji Nagar - 2, Opp. Mad Over Grill, Ved Road, Surat - 395004, (“Hiral Enterprise”, “we”, “us” or “our”) operates the mobile application/website www.exoticalingerie.in (referred to as the “Exotica Lingerie Platform”). Through this platform, we offer a curated selection of women’s intimate wear, including bras, panties, sleepwear, activewear, shapewear, and more (“Products”). Our mission is to provide high-quality, comfortable, and stylish products to our Users (“User” or “Users” or “you” or “your”), ensuring an exceptional shopping experience."
                },
                {
                    no: "1.2",
                    heading: "",
                    description: "This Privacy Policy (“Privacy Policy”), together with our Terms of Service, governs your use of the Exotica Lingerie Platform and describes our practices regarding the collection, use, disclosure, processing, transfer, and storage of your information. By accessing or using the Exotica Lingerie Platform, you consent to the practices described in this Privacy Policy."
                },
            ]
        },{
            no: "2",
            title: "Information We Collect",
            description: "We may collect various types of information from you, including:",
            subTabs: [
                {
                    no: "2.1",
                    heading: "Personal Information:",
                    description: "This may include your name, email address, phone number, shipping address, and payment information when you make a purchase."
                },
                {
                    no: "2.2",
                    heading: "Non-Personal Information:",
                    description: "We may collect non-personal information such as your IP address, browser type, referring website, and pages visited to improve our website and services."
                },
                {
                    no: "2.3",
                    heading: "",
                    description: "We do not knowingly collect Personal Information from individuals under 18 years of age. If we discover that we have collected such information, we will take steps to delete it promptly. Parents or guardians should contact us if they believe their child has provided information without consent."
                },
            ]
        },
        {
            no: "3",
            title: "How We Use Your Information",
            description: "We use the information we collect for the following purposes:",
            subTabs: [
                {
                    no: "3.1",
                    heading: "To Fulfill Orders:",
                    description: "To process and fulfill your orders, communicate with you about your purchase, and provide customer support"
                },
                {
                    no: "3.2",
                    heading: "To Improve Our Services:",
                    description: "To analyze trends, track user activities, and gather demographic information to improve our products and services."
                },
                {
                    no: "3.3",
                    heading: "To Communicate with You:",
                    description: "To send you promotional emails about new products, special offers, or other information we think you may find interesting."
                },
            ]
        },
        {
            no: "4",
            title: "Information Sharing",
            description: "We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide you with advance notice. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential."
        },
        {
            no: "5",
            title: "Security",
            description: "We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.",
            subTabs: [
                {
                    no: "5.1",
                    heading: "Importance of Security:",
                    description: "Your information is stored in secure networks accessible only by authorized personnel who require it for the purposes outlined in our Privacy Policy. These individuals are obligated to maintain confidentiality."
                },
                {
                    no: "5.2",
                    heading: "Access Control:",
                    description: "To analyze trends, track user activities, and gather demographic information to improve our products and services."
                },
                {
                    no: "5.3",
                    heading: "Limitations and Acknowledgment:",
                    description: "Despite our efforts to secure your information, we cannot guarantee absolute security. You acknowledge that complete security is not possible and agree not to hold us responsible for breaches or unauthorized actions beyond our control, such as government actions, hacking, or other security incidents."
                },
            ]
        },
        {
            no: "6",
            title: "Cookies",
            description: "We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future."
        },
        {
            no: "7",
            title: "Your Right",
            description: "You have the right to access, update, or delete your Personal Information. To exercise these rights, contact us at support@exoticalingerie.in."
        },
        { 
            no: "8",
            title: "Fraud Prevention Notice",
            description: "CUSTOMERS, GENERAL PUBLIC AND PROSPECTIVE CUSTOMERS ARE HEREBY CAUTIONED",
            subTabs:[
                {
                    no: "8.1",
                    heading: "Official Communication Channels:",
                    description: "Exotica Lingerie communicates with its customers through official channels only, including our website (www.exoticalingerie.in), official social media accounts, and authorized email addresses. Be wary of communication from unofficial sources."
                },
                {
                    no: "8.2",
                    heading: "Gift Schemes:",
                    description: "Exotica Lingerie does not conduct unsolicited gift schemes or promotions through unofficial channels. If you receive any communication claiming to be from Exotica Lingerie with such offers, please verify its authenticity through our official channels before taking any action."
                },
                {
                    no: "8.3",
                    heading: "Protect Your Personal Information:",
                    description: "Exotica Lingerie will never ask for sensitive personal information such as passwords, credit card details, or bank account information through unsolicited communications. Avoid sharing such information with anyone claiming to represent Exotica Lingerie outside our official platforms."
                },
                {
                    no: "8.4",
                    heading: "Verify Promotions:",
                    description: "Official promotions and offers from Exotica Lingerie are always announced through our official website and social media channels. If in doubt, please check our official channels or contact our customer support for verification."
                },
                {
                    no: "8.5",
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
            no: "9",
            title: "Your Consent",
            description: "By using our site, you consent to our website privacy policy."
        },
        {
            no: "10",
            title: "Changes to Our Privacy Policy",
            description: "If we decide to change our privacy policy, we will post those changes on this page."
        },
        {
            no: "11",
            title: "Contacting Us",
            description: "If there are any questions regarding this privacy policy, you may contact us using the information below:",
            address: {
                name: "Exotica Lingerie",
                addr1: "108, Shriji Nagar - 2, Opp. Mad Over Grill, Ved Road",
                city: "Surat",
                state: "Gujarat",
                zip: "395004",
                email: "support@exoticalingerie.in"
            }
        },
    ]
    
    return (
        <div className=' bg-gradient-to-b from-[#ffd9ea] to-[#fdf2f8]'>
            <div className='container max-w-screen-lg mx-auto py-8 p-2'>
                <div>
                    <h1 className=' text-4xl font-medium mb-1 font-serif max-sm:text-2xl'>Privacy Policy for Exotica Lingerie</h1>
                    <p className='text-gray-600'>With effective from 1 August 2024</p>
                </div>
                <hr className='mt-2 border-slate-500' />
                <div className='mt-4 flex flex-col gap-4 text-pretty'>
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
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicyPage