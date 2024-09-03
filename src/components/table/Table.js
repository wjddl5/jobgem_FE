import React from 'react'
import TableRow from "@/components/table/TableRow";

export default function Table({headers, list, isNumber}) {
    return (
        <table className="border-collapse w-full">
            <thead>
            <tr>
                {
                    headers.map((el, idx) => (
                        <th key={idx} className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            {el}
                        </th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {
                list.map((item, idx) => (
                    <TableRow number={idx} key={idx} item={item} isNumber={isNumber}/>
                ))
            }
            </tbody>
        </table>
    )
}
