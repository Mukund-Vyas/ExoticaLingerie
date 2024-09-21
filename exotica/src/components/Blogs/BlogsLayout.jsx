import React from 'react'

const BlogsLayout = ({ blogs }) => {
  return (
    <div className="container mx-auto xl:px-48 md:px-16 lg:px-24 py-10 bg-pink-50 max-md:py-6 max-md:p-2">
      <div className='w-full flex flex-col items-center justify-center mb-10 text-center'>
        <h1 className='text-4xl font-bold font-[roboto] text-gray-900 mb-4 max-md:text-2xl max-md:mb-2'>Latest articles and releases</h1>
        <h5 className='text-sm text-gray-500'>Discover the latest news, tips, and user stories from exotica lingerie.</h5>
      </div>

      {/* topics selection panel */}
      {/* <div className='w-full flex justify-center items-center gap-4 mb-10 font-medium text-slate-700'>
        <button className='bg-primary py-1 px-4 rounded-full text-zinc-100'>Fashion</button>
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
      </div> */}

<div className='w-full flex flex-wrap sm:hidden justify-center items-center gap-2 mb-6 font-medium text-slate-700'>
  <button className='bg-primary py-1 px-3 rounded-full text-zinc-100 w-full'>
    Fashion
  </button>
  <button className='py-1 px-3 rounded-full border border-slate-600 hover:border-primary w-full'>
    Lifestyle
  </button>
  <button className='py-1 px-3 rounded-full border border-slate-600 hover:border-primary w-full'>
    Fitness
  </button>
  <button className='py-1 px-3 rounded-full border border-slate-600 hover:border-primary w-full'>
    Quizzes
  </button>
  <button className='py-1 px-3 rounded-full border border-slate-600 hover:border-primary w-full'>
    Listicles
  </button>
  <button className='py-1 px-3 rounded-full border border-slate-600 hover:border-primary w-full'>
    Shop
  </button>
</div>
      {/* latest blog */}
      {blogs.length > 0 && (
        <div className='w-full flex rounded-2xl bg-white mb-10 border border-slate-400 max-md:flex-col-reverse'>
          <div className='w-1/2 max-md:w-full h-full flex flex-col justify-center items-start my-auto px-10 p-4'>
            <span className='text-xs font-semibold text-slate-500 py-1.5 px-2 border border-slate-400 rounded-md'>{blogs[0].tag}</span>
            <h2 className="mt-2 text-xl font-[roboto] font-bold text-gray-800">{blogs[0].title}</h2>
            <span className='text-sm font-semibold text-slate-500'>{blogs[0].date}</span>
          </div>
          <div className='w-1/2 max-md:w-full'>
            <img
              src={blogs[0].imageUrl}
              alt={blogs[0].title}
              className="h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl max-md:rounded-tr-2xl max-md:rounded-tl-2xl"
            />
          </div>
        </div>
      )}

      {/* other blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
        {blogs.slice(1).map((blog, index) => (
          <div key={index} className="relative bg-white shadow-md rounded-xl overflow-hidden border border-slate-400">
            <img src={blog.imageUrl} alt={blog.title} className="h-52 w-full object-cover" />
            <div className="p-4">
              <h2 className="mt-2 text-xl font-[roboto] font-bold text-gray-800">{blog.title}</h2>
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <span>{blog.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogsLayout