import React from 'react';

function Input(props) {
    return (
        <input
            {...props}
            className="
                        w-full
                        rounded
                        py-3
                        px-[14px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
        />
    );
}

export default Input;