import React from 'react'

function LayoutContent({ children }) {
    return (
        <div className='flex-1 overflow-y-auto w-full pb-3 pt-3 px-6'>
            {children}
        </div>
    )
}

export default LayoutContent
