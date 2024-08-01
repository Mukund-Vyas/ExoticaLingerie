import React from 'react'


const TextBlockWithSubItem = ({data, key}) => {
    console.log(data, "::: data :::");
    return (
        <div key={key} className='flex flex-col gap-2'>
            <h2 className='text-xl font-semibold'>{data?.no ? `${data?.no}. ` : ""}{data?.title}</h2>
            <p>{data?.description}</p>
            {
                data?.subTabs &&
                <div>
                {
                    data?.subTabs?.map((tab, index) => (
                        <div key={index}>
                            <span className=' font-semibold'> {tab?.no ? `${tab?.no}.` : ""} {tab?.heading}</span> {tab?.description}
                        </div>
                    ))
                }
            </div>
            }
            {
                data?.address && 
                <div>
                    <p>{data?.address?.name}</p>
                    <p>{data?.address?.addr1}</p>
                    <p>{data?.address?.addr2}</p>
                    <p>{data?.address?.city}, {data?.address?.state}, {data?.address?.zip},</p>
                    <p>{data?.address?.email}</p>
                    <p>{data?.address?.phone}</p>
                </div>
            }
        </div>
    )
}

export default TextBlockWithSubItem