import React from 'react'

export default function IconButton({children}) {
    return (
        <button
            className="middle size-6 text-2xl none center mr-4 flex items-center justify-center rounded-lg font-bold uppercase text-black disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >{children}
        </button>
    )
}
