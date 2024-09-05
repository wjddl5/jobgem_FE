import React from 'react';

function chunk(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );
}

export default function LocationSelector({ 
    LocationDoList, 
    LocationSiList, 
    selectedLocationDo, 
    setSelectedLocationDo, 
    selectedLocation, 
    handleLocationClick,
    showLocationSiList
}) {
    return (
        <div className="border rounded p-4">
            <div className="flex mb-4">
                <div className="w-2/5 pr-2">
                    <div className="font-medium mb-2">시/도</div>
                    <table className="w-full">
                        <tbody>
                            {LocationDoList && chunk(LocationDoList, 2).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((location, colIndex) => (
                                        <td key={colIndex} className="p-1 border">
                                            {selectedLocationDo.id === location.id ? 
                                                <div className="w-full px-3 py-1 text-sm bg-blue-100 active:bg-blue-200">{location.ldName}</div> : 
                                                <div onClick={()=>{setSelectedLocationDo(location)}} className="w-full px-3 py-1 text-sm hover:bg-blue-100 active:bg-blue-200">{location.ldName}</div>}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-3/5 pl-2">
                    <div className="font-medium mb-2">구/군</div>
                    <table className="w-full">
                        <tbody>
                            {LocationSiList && chunk(showLocationSiList(), 3).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((location, colIndex) => (
                                        <td key={colIndex} className="p-1">
                                            {selectedLocation.filter(selected => selected.lgIdx === location.id).length > 0 ? 
                                                <div className="w-full px-3 py-1 text-sm bg-blue-100">{location.lgName}</div> : 
                                                <button onClick={() => handleLocationClick(location)} className="w-full px-3 py-1 text-sm border rounded hover:bg-blue-100">
                                                    {location.lgName}
                                                </button>}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}