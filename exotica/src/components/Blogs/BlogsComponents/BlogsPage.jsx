import api from '@/src/utils/api';
import React, { useEffect, useState } from 'react'

const BlogsPage = ({ blogId, blogName }) => {
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (blogId) {
            const fetchBlogPost = async () => {
                try {
                    const response = await api.get(`/blog/${blogId}`); // Make the request
                    setBlogPost(response.data); // Set the blog post data
                } catch (err) {
                    console.log(err);
                    // Handle errors
                } finally {
                    setLoading(false); // Stop loading
                }
            };

            fetchBlogPost(); // Fetch the blog post
        }
    }, [blogId]);

    console.log(blogPost);

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
                                src={blogPost.mainImage}
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
                                        src={topic.subImage}
                                        alt={topic.subHeading}
                                        width={500}
                                        height={300}
                                        className="rounded-lg shadow-lg"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold mb-4">{topic.subHeading}</h2>
                                <p className="text-gray-600 mb-4">{topic.subText}</p>
                                {topic.actionButton.text && (
                                    <a
                                        href={topic.actionButton.link}
                                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition"
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
                        {data.tags.map((tag) => (
                            <span key={tag} className="bg-gray-200 text-gray-700 px-4 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogsPage