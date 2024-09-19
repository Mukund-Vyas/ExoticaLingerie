import React from 'react'

const BlogsLayout = ({blogs}) => {
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
    <div className="container mx-auto xl:px-48 md:px-16 lg:px-24 py-10 bg-pink-50">
      <div className='w-full flex flex-col items-center justify-center mb-10'>
        <h1 className='text-4xl font-bold font-[roboto] text-gray-900 mb-4'>Latest articles and releases</h1>
        <h5 className='text-sm text-gray-500'>Discover the latest new, tips and user stories from exotica lingerie.</h5>
      </div>

      {/* topics selection panel */}
      <div className=' w-full flex justify-center items-center gap-4 mb-10 font-medium text-slate-700'>
        {/* active button */}
        <button className='bg-primary py-1 px-4 rounded-full text-zinc-100'>
          Fashion
        </button>
        <button className='py-1 px-4 rounded-full border border-slate-600 hover:border-primary'>
          Lifestyle
        </button>
        <button className='py-1 px-4 rounded-full border border-slate-600 hover:border-primary'>
          Fitness
        </button>
        <button className='py-1 px-4 rounded-full border border-slate-600 hover:border-primary'>
          Quizzes
        </button>
        <button className='py-1 px-4 rounded-full border border-slate-600 hover:border-primary'>
          Listicles
        </button>
        <button className='py-1 px-4 rounded-full border border-slate-600 hover:border-primary'>
          Shop  
        </button>
      </div>

      {/* letest blog */}
      <div className='w-full flex rounded-2xl bg-white mb-10 border border-slate-400'>
        <div className='w-1/2 h-full flex flex-col justify-center items-start my-auto px-10'>
          <span className='text-xs font-semibold text-slate-500 py-1.5 px-2 border border-slate-400 rounded-md'>Fashion</span>
          <h2 className="mt-2 text-xl font-[roboto] font-bold text-gray-800">How to Build Your Lingerie Wardrobe: A Comprehensive Guide</h2>
          <span className='text-sm font-semibold text-slate-500'> 20 Sept 2024</span>
        </div>
        <div className='w-1/2'>
           <img
              src={"Images/ogimage.webp"}
              alt={"How to Build Your Lingerie Wardrobe: A Comprehensive Guide"}
              className="h-full object-cover rounded-tr-2xl rounded-br-2xl"
            />
        </div>
      </div>
      
      {/* rest of blog */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
        {articles.map((article, index) => (
          <div key={"blog" + index} className="relative bg-white shadow-md   rounded-xl overflow-hidden border border-slate-400">
          <div className="relative">
            <img
              src={article.imageUrl}
              alt={"How to Build Your Lingerie Wardrobe: A Comprehensive Guide"}
              className="h-52 w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="mt-2 text-xl font-[roboto] font-bold text-gray-800">How to Build Your Lingerie Wardrobe: A Comprehensive Guide</h2>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <span>20 Sept 2024</span>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}   

export default BlogsLayout