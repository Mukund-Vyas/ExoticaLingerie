import React from 'react';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';
import BlogsPage from '@/src/components/Blogs/BlogsComponents/BlogsPage';

const BlogPage = () => {
  const { query } = useRouter();
  const { blogs, blogName } = query;

  if (!blogs) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
      </div>
    );
  }

  return (
    <div>
      <BlogsPage blogId={blogs} blogName={blogName} />
    </div>
  );
};

export default BlogPage;