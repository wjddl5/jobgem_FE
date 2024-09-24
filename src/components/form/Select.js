import React from "react";

export default function (props) {
	return (
		<select
			{...props}
			className='w-full
                        rounded
                        py-3
                        px-[14px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary'
		>
			{props.ar.map((value, idx) => (
				<option key={idx}>{value}</option>
			))}
		</select>
	);
}
