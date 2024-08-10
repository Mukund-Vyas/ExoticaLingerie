import Link from 'next/link';
import React from 'react'


const TextBlockWithSubItem = ({data, key}) => {
    // console.log(data, "::: data :::");
    return (
        <div key={key} className='flex flex-col gap-2'>
            <h2 className='text-xl font-semibold'>{data?.no ? `${data?.no}. ` : ""}{data?.title}</h2>
            <p className={`text-justify ${data?.no ? `ml-4` : ""}`}>{data?.description}</p>
            {
                data?.subTabs &&
                <div>
                {
                    data?.subTabs?.map((tab, index) => (
                        <div key={index} className='ml-4 text-justify mb-2'>
                            <span className=' font-semibold'> {tab?.no ? `${tab?.no}.` : ""} {tab?.heading}</span> {tab?.description}
                        </div>
                    ))
                }
            </div>
            }
            {
                data?.address && 
                <div className='ml-4 text-justify'>
                    <p>{data?.address?.name}</p>
                    <p>{data?.address?.addr1}</p>
                    <p>{data?.address?.addr2}</p>
                    <p>{data?.address?.city}, {data?.address?.state}, {data?.address?.zip},</p>
                    <Link href={`mailto:${data?.address?.email}`} className='text-primary'>{data?.address?.email}</Link>
                    <p>{data?.address?.phone}</p>
                </div>
            }
        </div>
    )
}

export default TextBlockWithSubItem