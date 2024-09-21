import BlogsLayout from '@/src/components/Blogs/BlogsLayout';
import React from 'react'

const index = () => {
  const articles = [
    {
      title: "Make Your Phone Your Best Study Tool",
      date: "20 Jul 2023",
      tag: "Tips",
      imageUrl: "Images/ogimage.webp",
      topLeftColor: "bg-yellow-300", // Customize colors for each card if needed
      bottomRightColor: "bg-yellow-300",
    },
    {
      title: "How to Maintain Good Wellbeing While Studying",
      date: "20 Jul 2023",
      tag: "Wellbeing",
      imageUrl: "Images/ogimage.webp",
      topLeftColor: "bg-purple-700",
      bottomRightColor: "bg-purple-700",
    },
    {
      title: "Atomic Habits: Tiny Changes, Remarkable Results",
      date: "20 Jul 2023",
      tag: "Productivity",
      imageUrl: "Images/ogimage.webp",
      topLeftColor: "bg-orange-500",
      bottomRightColor: "bg-orange-500",
    },
    {
      title: "Solstice + Zoom Collaboration",
      date: "20 Jul 2023",
      tag: "",
      imageUrl: "Images/ogimage.webp",
      topLeftColor: "bg-purple-900",
      bottomRightColor: "bg-purple-900",
    },
    {
      title: "Solstice x Udemy Partnership",
      date: "20 Jul 2023",
      tag: "",
      imageUrl: "Images/ogimage.webp",
      topLeftColor: "bg-black",
      bottomRightColor: "bg-black",
    },
  ];

  return (
    <BlogsLayout blogs={articles} />
  )
}

export default index