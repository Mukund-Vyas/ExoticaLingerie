import React, { useEffect, useState } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb'; // Importing icons for edit and delete
import api from '@/src/utils/api'; // Axios instance
import { Oval } from 'react-loader-spinner';
import Link from 'next/link';

const BlogActions = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blog/main-details');
        setBlogs(response.data.blogs); // Adjust based on actual response structure
      } catch (error) {
        setError('Error fetching blog data. Please try again later.');
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle edit functionality (you can implement the redirection or modal logic here)
  const handleEdit = (blogId) => {
    console.log('Edit blog with ID:', blogId);
    // Implement navigation or modal logic for editing
  };

  // Handle delete functionality
  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');

    if (!confirmDelete) return;

    try {
      // Sending delete request to backend
      const response = await api.delete(`/blog/${blogId}`);
      console.log(response.data.message);

      // Filter out the deleted blog from the state
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError('Error deleting blog. Please try again later.');
    }
  };

  if (loading) {
    return <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
    </div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {blogs.map(blog => (
        <div key={blog._id} className='relative'>
          <Link href={`/blogs/${blog.mainHeading.replace(/\s+/g, '-').toLowerCase()}-${blog._id}`}>
            <div className="bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={encodeURI(`${process.env.NEXT_PUBLIC_Image_URL}/${blog.mainImage}`)}
                alt={blog.mainHeading}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="mt-2">
                  <span className="inline-block bg-pink-200 text-pink-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {blog.categories}
                  </span>
                  <h2 className="text-lg font-bold text-gray-800">{blog.mainHeading}</h2>
                </div>
              </div>

            </div>
          </Link>
          <div className="absolute top-2 right-2 flex flex-col space-y-2 z-10">
            <button
              onClick={() => handleEdit(blog._id)}
              className="bg-white p-2 rounded-full shadow-sm border border-slate-400 text-blue-600 hover:text-blue-800"
              title="edit"
            >
              <TbEdit className="text-lg" />
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              className="bg-white p-2 rounded-full shadow-sm border border-slate-400 text-red-600 hover:text-red-800"
              title="delete"
            >
              <TbTrash className="text-lg" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogActions;
