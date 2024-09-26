import api from '@/src/utils/api';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

const BlogsPage = ({ blogId }) => {
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (blogId) {
            console.log("Fetching data with blogId:", blogId);

            const fetchBlogPost = async () => {
                try {
                    const response = await api.get(`/blog/${blogId}`); // Make the request
                    setBlogPost(response.data); // Set the blog post data
                    console.log("Data fetched:", response.data);
                } catch (err) {
                    console.error("Error fetching data:", err);
                    // Handle errors
                } finally {
                    setLoading(false); // Stop loading
                }
            };

            fetchBlogPost(); // Fetch the blog post
        }
    }, [blogId]);

    console.log("blogId:", blogId);

    if (loading) {
        return <p>Loading...</p>; // Display a loading state
    }

    if (!blogPost) {
        return <p>No blog post found.</p>; // Handle case when no blog post is found
    }

    const blogUrl = encodeURI(`https://exoticalingerie.in/blogs/${blogId}?blogName=${blogPost.mainHeading}`);
    return (
        <>
            <Head>
                {/* SEO Meta Tags */}
                <title>{blogPost.mainHeading}</title>
                <meta name="description" content={blogPost.mainText.substring(0, 150)} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={blogUrl} />
                <meta name="keywords" content={blogPost.tags.join(", ")} />

                {/* Open Graph Meta Tags for Social Sharing */}
                <meta property="og:title" content={blogPost.mainHeading} />
                <meta property="og:description" content={blogPost.mainText.substring(0, 150)} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={blogUrl} />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_Image_URL}/${blogPost.mainImage}`} />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blogPost.mainHeading} />
                <meta name="twitter:description" content={blogPost.mainText.substring(0, 150)} />
                <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_Image_URL}/${blogPost.mainImage}`} />

                {/* Structured Data for SEO (Schema.org) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "keywords": blogPost.tags.join(", "),
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": blogUrl
                        },
                        "headline": blogPost.mainHeading,
                        "image": encodeURI(`${process.env.NEXT_PUBLIC_Image_URL}/${blogPost.mainImage}`), // URL to image
                        "author": {
                            "@type": "Organization",
                            "name": "Team Exotica Lingerie"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Exotica Lingerie",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://www.exoticalingerie.in/Images/logo.png" // URL to your logo
                            }
                        },
                        "datePublished": blogPost.publishedAt || "2024-09-01",
                        "dateModified": blogPost.updatedAt || "2024-09-01"
                    })}
                </script>

                {/* Import Google Fonts */}
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
            </Head>

            <div className='py-6 max-sm:p-4 xl:px-48 md:px-16 lg:px-24 bg-pink-50 text-justify max-sm:text-sm'>
                {/* Headings */}
                <div className="container mx-auto py-8">
                    {/* Main Section */}
                    <div className="text-center mb-8">
                        <h1 className="sm:text-4xl max-sm:text-xl font-bold mb-6 font-[playfair]">{blogPost.mainHeading}</h1>
                        <p className="text-gray-700 my-4 font-[roboto]">{blogPost.mainText}</p>
                        {blogPost.mainImage && (
                            <div className="flex justify-center">
                                <Image
                                    src={encodeURI(`${process.env.NEXT_PUBLIC_Image_URL}/${blogPost.mainImage}`)}
                                    alt={blogPost.mainHeading}
                                    width={800}
                                    height={500}
                                    className="rounded-lg shadow-lg w-full"
                                />
                            </div>
                        )}
                    </div>

                    {/* SubTopics Section */}
                    <div className="space-y-12">
                        {blogPost.subTopics.map((topic, index) => (
                            <div key={topic._id} className="flex flex-col-reverse md:flex-row items-center gap-8">
                                {topic.subImage && (
                                    <div className={`flex-1 ${index % 2 === 0 ? 'order-2' : ''}`}>
                                        <Image
                                            src={encodeURI(`${process.env.NEXT_PUBLIC_Image_URL}/${topic.subImage}`)}
                                            alt={topic.subHeading}
                                            width={500}
                                            height={300}
                                            className="rounded-lg shadow-lg"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h2 className="sm:text-2xl max-sm:text-lg font-semibold mb-4 font-[playfair]">{topic.subHeading}</h2>
                                    <p className="text-gray-600 mb-4 font-[roboto]">{topic.subText}</p>
                                    {topic.actionButton?.text && (
                                        <a
                                            href={topic.actionButton.link}
                                            className="bg-primary text-white py-2 px-6 rounded-full hover:bg-pink-700 transition"
                                        >
                                            {topic.actionButton.text}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tags Section */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-[playfair]">Tags</h3>
                        <div className="flex flex-wrap gap-3">
                            {blogPost.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-rose-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogsPage;