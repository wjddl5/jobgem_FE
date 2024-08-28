import React from 'react'

export default function TableRow({item}) {
    const values= Object.values(item);

    return (
        <tr
            className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            {
                values.map((value, idx)=> (
                    <td key={idx} className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        <span
                                className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Company name</span>
                        {value}
                    </td>
                ))
            }
        </tr>
    )
}
