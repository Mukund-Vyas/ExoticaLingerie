import React from 'react';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';
import BlogsPage from '@/src/components/Blogs/BlogsComponents/BlogsPage';

const BlogPage = () => {
  const { query } = useRouter();

  const blog = query.blogs || ''; // This should contain the blog name and ID from the URL
  const blogParts = blog.split('-'); // Split by hyphen '-'
  const extractedId = blogParts.pop(); // Extract the last element (ID)
  const blogname = blogParts.join('-'); // Join the remaining parts to get the blog name

  // Check if blogs is null, undefined, or empty
  if (!extractedId || blogname === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
      </div>
    );
  }

  // Render BlogsPage if blogs and blogName exist
  return (
    <div>
      <BlogsPage blogId={extractedId} blogName={blogname} />
    </div>
  );
};

export default BlogPage;