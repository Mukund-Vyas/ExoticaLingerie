import api from '@/src/utils/api';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const BlogsPage = ({ blogId, blogName }) => {
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

    return (
        <div className='py-6 max-sm:p-2 xl:px-48 md:px-16 lg:px-24 bg-pink-50'>
            {/* Headings */}
            <div className="container mx-auto px-4 py-8">
                {/* Main Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">{blogPost.mainHeading}</h1>
                    <p className="text-gray-700 my-4">{blogPost.mainText}</p>
                    {blogPost.mainImage && (
                        <div className="flex justify-center">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_Image_URL}/${blogPost.mainImage}`}
                                alt={blogPost.mainHeading}
                                width={800}
                                height={500}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                </div>

                {/* SubTopics Section */}
                <div className="space-y-12">
                    {blogPost.subTopics.map((topic, index) => (
                        <div key={topic._id} className="flex flex-col md:flex-row items-center gap-8">
                            {topic.subImage && (
                                <div className={`flex-1 ${index % 2 === 0 ? 'order-2' : ''}`}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_Image_URL}/${topic.subImage}`}
                                        alt={topic.subHeading}
                                        width={500}
                                        height={300}
                                        className="rounded-lg shadow-lg max-h-96"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold mb-4">{topic.subHeading}</h2>
                                <p className="text-gray-600 mb-4">{topic.subText}</p>
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
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {blogPost.tags.map((tag) => (
                            <span key={tag} className="bg-gray-200 text-gray-700 px-4 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsPage;