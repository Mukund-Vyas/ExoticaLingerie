import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductsPage/ProductsPageComponents/ProductCard'
import { getWishlists } from '@/src/services/wishlist'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { IoHeartDislikeSharp } from "react-icons/io5";
import Link from 'next/link'

const WishlistLayout = () => {
    const[products, setProducts]=useState([])
    const {authToken} = useSelector((state)=>state.user);
    useEffect(()=>{
        getWishListHandler();
    },[])
    const getWishListHandler = async () =>{
        getWishlists(authToken).then(res=>{
            if(res){
                setProducts(res)
            }
        })
    }
// Flatten all variations from all products into a single array
  const allVariations = products?.map((item) =>{
    let variation = item?.product?.variations?.find((v)=>v?._id == item?.variation)
    return {...item?.product, variation}
  }
  );
  
  return (
    <div className='bg-pink-50 divide-y divide-pink-200'>
      <div><Toaster position="bottom-center" reverseOrder={false} /></div>
      <div className="container mx-auto py-4 px-4 sm:px-2 md:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allVariations?.map((item, index) => (
          <ProductCard
            key={`${item._id}-${item.variation._id}-${index}`}
            product={item}
            variation={item.variation}
            getWishlist={getWishListHandler}
          />
        ))}

        {allVariations.length === 0 && 
          <div className='flex flex-col gap-2 items-center justify-center h-96 w-screen'>
            <IoHeartDislikeSharp className='text-9xl text-primary'/>
            <p className='font-medium text-2xl'>
              Your wishlist is empty
            </p>
            <Link href={"/products"} className='bg-rose-500 px-5 py-2 rounded-md text-white font-medium'>
              Let`s Shopping..!
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default WishlistLayout