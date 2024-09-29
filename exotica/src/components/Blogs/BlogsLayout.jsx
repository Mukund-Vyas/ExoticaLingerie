import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { useRouter } from 'next/router'; // Import useRouter for routing
import { FiFilter } from 'react-icons/fi';
import { RxDotFilled } from "react-icons/rx";
import Link from 'next/link';

const BlogsLayout = ({ blogs }) => {
  const router = useRouter(); // Initialize router
  const { category } = router.query; // Get the current category from the URL
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to manage filter menu visibility
  const [activeTopic, setActiveTopic] = useState(category || 'All'); // State to manage the selected category

  // Available topics/categories
  const topics = ['All', 'Fashion', 'Lifestyle', 'Fitness', 'Quizzes', 'Listicles', 'Shop'];

  useEffect(() => {
    // Update active topic based on URL category
    if (category) {
      setActiveTopic(category);
    }
  }, [category]);

  // Toggle filter menu visibility
  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Filter blogs based on the active topic
  const filteredBlogs = (activeTopic === 'All'
    ? blogs
    : blogs.filter(blog => blog.categories === activeTopic)
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  

  // Handle category button click and update URL
  const handleCategoryChange = (topic) => {
    setActiveTopic(topic);
    router.push(`/blogs/?category=${topic}`); // Update URL with selected category
  };

  return (
    <div className="container mx-auto xl:px-48 md:px-16 lg:px-24 py-10 bg-pink-50 max-md:py-6 max-md:p-2">
      <div className='w-full flex flex-col items-center justify-center mb-10 text-center'>
        <h1 className='text-4xl font-bold font-[roboto] text-gray-900 mb-4 max-md:text-2xl max-md:mb-2'>
          Latest articles and releases
        </h1>
        <h5 className='text-sm text-gray-500'>
          Discover the latest news, tips, and user stories from Exotica Lingerie.
        </h5>
      </div>

      {/* Topics selection buttons for larger screens */}
      <div className='w-full flex max-sm:hidden justify-center items-center gap-4 mb-10 font-medium text-slate-700'>
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(topic)}
            className={`py-1 px-4 rounded-full border ${activeTopic === topic ? 'bg-primary text-zinc-100' : 'border-slate-600 hover:border-primary'
              }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Filter button for small screens */}
      <div className="w-full flex sm:hidden justify-end items-center mb-6">
        <button
          className="flex items-center py-2 px-4 bg-primary text-white rounded-full"
          onClick={toggleFilterMenu}
        >
          <FiFilter className="mr-2" /> {/* Menu icon */}
          Filter
        </button>
      </div>

      {/* Dropdown menu for small screens */}
      {isFilterOpen && (
        <div className="w-full sm:hidden flex flex-wrap justify-center items-center gap-2 mb-6 font-medium text-slate-700">
          {topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => { handleCategoryChange(topic); toggleFilterMenu(); }}
              className={`py-1 px-3 rounded-full text-slate-700 w-full sm:w-auto border ${activeTopic === topic ? 'bg-primary text-zinc-100' : 'border-slate-600 hover:border-primary'
                }`}
            >
              {topic}
            </button>
          ))}
        </div>
      )}

      {/* No content message */}
      {filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Image
            src="/Images/no-blogs.png" // Use your own image here
            alt="No content"
            width={125}
            height={125}
            className="mb-4"
          />
          <p className="text-lg text-slate-600 font-medium">
            Sorry, no blogs are available for this category.
          </p>
        </div>
      ) : (
        <>
          {/* Latest blog */}
          {filteredBlogs.length > 0 && (
            // /blogs/${filteredBlogs[0]._id}?blogName=${filteredBlogs[0].mainHeading}
            <Link href={`/blogs/${filteredBlogs[0].mainHeading.replace(/\s+/g, '-').toLowerCase()}-${filteredBlogs[0]._id}`}>
              <div className='w-full flex rounded-2xl bg-white mb-10 border border-slate-400 max-md:flex-col-reverse'>
                <div className='w-1/2 max-md:w-full h-full flex flex-col justify-center items-start my-auto px-10 p-4'>
                  {filteredBlogs[0].categories && <span className='text-xs font-semibold text-slate-500 py-1.5 px-2 border border-slate-400 rounded-md'>
                    {filteredBlogs[0].categories}
                  </span>}
                  <h2 className="mt-2 text-xl font-[roboto] font-bold text-gray-800">
                    {filteredBlogs[0].mainHeading}
                  </h2>
                  <div className='text-sm flex items-center mt-4 text-slate-500'>
                    <span>{new Date(filteredBlogs[0].createdAt).toISOString().split('T')[0]}</span>
                    <RxDotFilled />
                    <span>By Team Exotica</span>
                  </div>
                </div>
                <div className='w-1/2 max-md:w-full'>
                  <Image
                    src={encodeURI(`${process.env.NEXT_PUBLIC_Image_URL}/${filteredBlogs[0].mainImage}`)}
                    alt={filteredBlogs[0].title}
                    width={200} // Set appropriate width
                    height={200} // Set appropriate height
                    className="w-full object-cover md:rounded-tr-2xl md:rounded-br-2xl max-md:rounded-tr-2xl max-md:rounded-tl-2xl"
                  />
                </div>
              </div>
            </Link>
          )}

          {/* Other blogs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
            {filteredBlogs.slice(1).map((blog, index) => (
              <Link key={"blog" + index} href={`/blogs/${blog.mainHeading.replace(/\s+/g, '-').toLowerCase()}-${blog._id}`}>
                <div className="relative bg-white shadow-md rounded-xl overflow-hidden border border-slate-400">
                  <Image
                    src={encodeURI(`${process.env.NEXT_PUBLIC_Image_URL}/${blog.mainImage}`)}
                    alt={blog.mainHeading}
                    width={400}
                    height={250}
                    className="h-52 w-full object-cover"
                  />
                  <div className="p-4">
                    <span className='text-xs font-semibold text-slate-500 py-1.5 px-2 border border-slate-400 rounded-md'>
                      {blog.categories}
                    </span>
                    <h2 className="mt-2 text-xl font-[roboto] font-bold text-gray-800">{blog.mainHeading}</h2>
                    <div className="flex gap-1 items-center mt-4 text-sm text-gray-500">
                      <span>{new Date(blog.createdAt).toISOString().split('T')[0]}</span>
                      <RxDotFilled />
                      <span>By Team Exotica</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogsLayout;
