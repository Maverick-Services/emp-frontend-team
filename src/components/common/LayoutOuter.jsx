import React from 'react'

function LayoutOuter({ children }) {
    return (
        <div className='bg-[#F3F6FE] h-screen flex flex-col overflow-hidden'>
            {children}
        </div>
    )
}

export default LayoutOuter
