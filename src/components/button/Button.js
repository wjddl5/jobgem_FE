import React from 'react';

const baseButtonClasses = "flex-shrink-0 rounded-lg py-3 px-4 text-xs font-bold uppercase shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

const Button = ({ text, type }) => {
    const buttonClasses = type === 'submit'
        ? `${baseButtonClasses} bg-blue-500 text-white shadow-blue-500/20 hover:shadow-blue-500/40`
        : `${baseButtonClasses} border border-blue-500 bg-white text-blue-500 shadow-blue-500/20 hover:shadow-blue-500/40`;

    return (
        <button
            type='button'
            className={buttonClasses}
            data-ripple-light="true"
        >
            {text}
        </button>
    );
};

export default Button;