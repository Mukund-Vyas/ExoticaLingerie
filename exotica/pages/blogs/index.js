import BlogsLayout from '@/src/components/Blogs/BlogsLayout';
import React from 'react';
import api from '@/src/utils/api';

// This function fetches blog data from your backend API
export const getServerSideProps = async () => {
  try {
    const response = await api.get('/blog/main-details'); // Replace with your API URL
    const articles = response.data.blogs;

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return {
      props: {
        articles: [], // Return an empty array in case of error
      },
    };
  }
};

const Index = ({ articles }) => {
  console.log(articles);
  
  return <BlogsLayout blogs={articles} />;
};

export default Index;
