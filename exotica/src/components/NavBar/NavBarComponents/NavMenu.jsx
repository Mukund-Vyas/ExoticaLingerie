import Link from 'next/link'
import React from 'react'
import {FiChevronDown} from 'react-icons/fi'

const NavMenu = () => {
    
  return (
    <div className='flex items-center justify-center gap-10 w-full px-24 pb-1 bg-pink-50'>
        <div className='relative group'>
            <Link href={"/products"} className='flex gap-1 items-center text-black'>
                New Arrivals
                <FiChevronDown className='pt-1 text-xl'/>
            </Link>
            <div className='absolute hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li><Link href={"/products"} className='hover:text-primary'>Bras</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Activewear</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Panties</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Shapewear</Link></li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <Link href={"/products"} className='flex gap-1 items-center text-black'>
                Bras 
                <FiChevronDown className='pt-1 text-xl'/>
            </Link>
            <div className='absolute hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li><Link href={"/products/Lace Bra"} className='hover:text-primary'>Bridal Bras</Link></li>
                    <li><Link href={"/products/Bralette"} className='hover:text-primary'>Bralette</Link></li>
                    <li><Link href={"/products/Cross Belt Bra"} className='hover:text-primary'>Cross Belt Bra</Link></li>
                    <li><Link href={"/products/Front  Open Bra"} className='hover:text-primary'>Front  Open Bra</Link></li>
                    <li><Link href={"/products/Full coverage bra"} className='hover:text-primary'>Full coverage bra</Link></li>
                    <li><Link href={"/products/Padded Bra"} className='hover:text-primary'>Padded Bras</Link></li>
                    <li><Link href={"/products/Miracle Bra"} className='hover:text-primary'>Miracle Bra</Link></li>
                    <li><Link href={"/products/Lightly Padded Bra"} className='hover:text-primary'>Lightly Padded Bra</Link></li>
                    <li><Link href={"/products/Seemed Bra"} className='hover:text-primary'>Seemed Bra</Link></li>
                    <li><Link href={"/products/Lacy Bra"} className='hover:text-primary'>Lacy Bra</Link></li>
                    <li><Link href={"/products/T-Shirt Bra"} className='hover:text-primary'>T-Shirt Bra</Link></li>
                    <li><Link href={"/products/Bralette"} className='hover:text-primary'>Bralette</Link></li>
                    <li><Link href={"/products/Sag Lift Bra"} className='hover:text-primary'>Sag Lift Bra </Link></li>
                    <li><Link href={"/products/Minimizer"} className='hover:text-primary'>Minimizer</Link></li>
                    <li><Link href={"/products/Beginners bra"} className='hover:text-primary'>Beginners bra</Link></li>
                    <li><Link href={"/products/Backless Bra"} className='hover:text-primary'>Backless Bra</Link></li>
                    <li><Link href={"/products/Low Cut Bra "} className='hover:text-primary'>Low Cut Bra</Link></li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <Link href={"/products/Sport Bra"} className='flex gap-1 items-center text-black'>
                Activewear 
                <FiChevronDown className='pt-1 text-xl'/>
            </Link>
            <div className='absolute hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li><Link href={"/products/Sport Bra"} className='hover:text-primary'>Sports wear</Link></li>
                    <li><Link href={"/products/Sag Lift Bra"} className='hover:text-primary'>Gym wear</Link></li>
                    <li><Link href={"/products/Full coverage bra"} className='hover:text-primary'>Yoga wear</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Running & Walking wear</Link></li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <Link href={"/products"} className='flex gap-1 items-center text-black'>
                Panties 
                <FiChevronDown className='pt-1 text-xl'/>
            </Link>
            <div className='absolute hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li><Link href={"/products"} className='hover:text-primary'>Seamless Panties</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Shaper Panties</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Pack of 2</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Pack of 4</Link></li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <Link href={"/products/Bikini Set"} className='flex gap-1 items-center text-black'>
                Lingerie Set 
                <FiChevronDown className='pt-1 text-xl'/>
            </Link>
            <div className='absolute right-0 hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li><Link href={"/products/Bikini Set"} className='hover:text-primary'>Lingerie Set</Link></li>
                </ul>
            </div>
        </div>
        <div className='relative group'>
            <Link href={"/products"} className='flex gap-1 items-center text-black'>
                Shapewear 
                <FiChevronDown className='pt-1 text-xl'/>
            </Link>
            {/* <div className='absolute right-0 hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li>
                        <Link href={"/products"} className='hover:text-primary'>Bras</Link>
                    </li>
                    <li><Link href={"/products"} className='hover:text-primary'>Activewear</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Panties</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Shapewear</Link></li>
                </ul>
            </div> */}
        </div>
        <div className='relative group'>
            <Link href={"/products"} className='flex gap-1 items-center text-black'>
                Offre ZOne
                <FiChevronDown className='pt-1 text-xl'/>
            </Link>
            <div className='absolute right-0 hidden z-10 group-hover:block w-auto min-w-96 bg-pink-50 py-5 pl-3 border-[1px] border-gray-400'>
                <p className='pb-2 font-semibold font-mono uppercase text-sm hover:underline hover:underline-offset-2 decoration-primary decoration-[0.1rem]'>New Arrivals</p>
                <ul>
                    <li><Link href={"/products"} className='hover:text-primary'>Flat 10% off</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Flat 15% off</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Flat 20% off</Link></li>
                    <li><Link href={"/products"} className='hover:text-primary'>Flat 40% off</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NavMenu