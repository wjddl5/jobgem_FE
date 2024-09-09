import React from "react";

<<<<<<< HEAD
export default function TableRow({ item, number, isNumber }) {
	const values = Object.values(item);

	return (
		<tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
			{isNumber && <td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>{number + 1}</td>}
			{values.map((value, idx) => (
				<td key={idx} className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
					{value}
				</td>
			))}
		</tr>
	);
=======
export default function TableRow({item, number}) {
    const values= Object.values(item);

    return (
        <tr
            className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            {
                values.map((value, idx)=> (
                    <td key={idx} className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        {value}
                    </td>
                ))
            }
        </tr>
    )
>>>>>>> 07cbf5ef3463dd6b66a6cb0b24f5bb95b1ec4ba4
}
