import React from 'react'
import {FiChevronDown} from 'react-icons/fi'

const NavMenu = () => {
    
  return (
    <div className='flex items-center justify-center gap-10 w-full px-24 pb-1 bg-pink-50'>
        <div className='relative group'>
            <button className='flex gap-1 items-center text-black'>
                New Arrivals 
                <FiChevronDown className='pt-1 text-xl'/>
            </button>
            <div className='absolute hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li className='hover:text-primary'>Bras</li>
                    <li className='hover:text-primary'>Activewear</li>
                    <li className='hover:text-primary'>Panties</li>
                    <li className='hover:text-primary'>Shapewear</li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <button className='flex gap-1 items-center text-black'>
                Bras 
                <FiChevronDown className='pt-1 text-xl'/>
            </button>
            <div className='absolute hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li className='hover:text-primary'>Bras</li>
                    <li className='hover:text-primary'>Activewear</li>
                    <li className='hover:text-primary'>Panties</li>
                    <li className='hover:text-primary'>Shapewear</li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <button className='flex gap-1 items-center text-black'>
                Activewear 
                <FiChevronDown className='pt-1 text-xl'/>
            </button>
            <div className='absolute hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li className='hover:text-primary'>Bras</li>
                    <li className='hover:text-primary'>Activewear</li>
                    <li className='hover:text-primary'>Panties</li>
                    <li className='hover:text-primary'>Shapewear</li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <button className='flex gap-1 items-center text-black'>
                Panties 
                <FiChevronDown className='pt-1 text-xl'/>
            </button>
            <div className='absolute hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li className='hover:text-primary'>Bras</li>
                    <li className='hover:text-primary'>Activewear</li>
                    <li className='hover:text-primary'>Panties</li>
                    <li className='hover:text-primary'>Shapewear</li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <button className='flex gap-1 items-center text-black'>
                Lingerie Set 
                <FiChevronDown className='pt-1 text-xl'/>
            </button>
            <div className='absolute right-0 hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li className='hover:text-primary'>Bras</li>
                    <li className='hover:text-primary'>Activewear</li>
                    <li className='hover:text-primary'>Panties</li>
                    <li className='hover:text-primary'>Shapewear</li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <button className='flex gap-1 items-center text-black'>
                Shapewear 
                <FiChevronDown className='pt-1 text-xl'/>
            </button>
            <div className='absolute right-0 hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li className='hover:text-primary'>Bras</li>
                    <li className='hover:text-primary'>Activewear</li>
                    <li className='hover:text-primary'>Panties</li>
                    <li className='hover:text-primary'>Shapewear</li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <button className='flex gap-1 items-center text-black'>
                Offre ZOne
                <FiChevronDown className='pt-1 text-xl'/>
            </button>
            <div className='absolute right-0 hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li className='hover:text-primary'>Bras</li>
                    <li className='hover:text-primary'>Activewear</li>
                    <li className='hover:text-primary'>Panties</li>
                    <li className='hover:text-primary'>Shapewear</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NavMenu