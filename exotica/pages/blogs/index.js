import BlogsLayout from '@/src/components/Blogs/BlogsLayout';
import React from 'react'

const index = () => {
    const blogs = [
        {
          id: '1',
          mainImage: 'https://cdn.zivame.com/media/v3/paddednonwired_mob_16_09.png',
          mainHeading: 'Blog Title 1',
          excerpt: 'This is a short summary of blog 1...',
        },
        {
          id: '2',
          mainImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTixgqQMb_TiAX8ldw4bBeHMaE29zJMPKT0fw&s',
          mainHeading: 'Blog Title 2',
          excerpt: 'This is a short summary of blog 2...',
        },
        {
          id: '3',
          mainImage: 'https://thumbor-gc.tomandco.uk/unsafe/513x342/center/middle/smart/filters:upscale():sharpen(0.5,0.5,true)/https://www.royce-lingerie.co.uk/static/uploads/2020/03/sisters4.jpg',
          mainHeading: 'Blog Title 3',
          excerpt: 'This is a short summary of blog 3...',
        },
      ];
      
    return (
        <BlogsLayout blogs={blogs}/>
    )
}

export default index