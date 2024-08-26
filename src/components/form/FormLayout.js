import React from 'react';

function FormLayout({children}) {
    return (
        <div className='flex justify-center'>
            <form className='w-full md:w-3/4 flex gap-2 flex-col'>{children}</form>
        </div>
    );
}

export default FormLayout;