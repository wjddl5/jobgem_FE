import React from 'react';

function Textarea(props) {
    return (
        <textarea
            {...props}
            className="
                        w-full
                        rounded
                        py-3
                        px-[14px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        resize-none
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
        ></textarea>
    );
}

export default Textarea;