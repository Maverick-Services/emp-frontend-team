import React from 'react'

function LayoutProvider({ heading, children }) {
    return (
        <div className='bg-[#F3F6FE] h-screen flex flex-col overflow-y-auto pb-4'>
            <div className='w-full pb-3 pt-5 bg-[#F3F6FE]'>
                <h1 className='text-3xl font-bold text-blue-900 px-6'>{heading}</h1>
            </div>
            <div className='flex-1 overflow-y-auto px-6 pt-3'>
                {children}
            </div>
        </div>
    )
}

export default LayoutProvider
