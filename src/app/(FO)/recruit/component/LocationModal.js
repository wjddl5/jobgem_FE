import { Button, Chip, Dialog } from '@mui/material';
import { useState } from 'react';

export default function LocationModal({ open, setOpen, location, setSelectedLocation }) {
    const regions = location.map((region) => ({
        name: region.ldName,
        districts: region.locationGuSiDto.map((district) => {
            return {
                name: district.lgName,
                id: district.id
            }
        })
    }));

    const [selectedDo, setSelectedDo] = useState(regions[0]);
    const [selectedGuSi, setSelectedGuSi] = useState([]);
    const [chips, setChips] = useState([]);

    const handleRegionSelect = (region) => {    
        setSelectedDo(region);
    };

    const handleDistrictToggle = (district) => {
        setSelectedGuSi(prev =>
            prev.includes(district.id) ? prev.filter(d => d !== district.id) : [...prev, district.id]
        );
        setChips(prev =>
            prev.includes(district.name) ? prev.filter(d => d !== district.name) : [...prev, district.name]
        );
    };

    const handleReset = () => {
        setSelectedDo(regions[0]);
        setSelectedGuSi([]);
        setSelectedLocation([]);
        setChips([]);
        setOpen(false);
    };

    const handleApply = () => {
        setSelectedLocation([...selectedGuSi]);
        setOpen(false);
    };

    return (
        <Dialog open={open} fullWidth={true} maxWidth={'sm'} >
            <div className='p-6'>
                <div className="flex space-x-4 bg-white w-full mb-4">
                    <div className="w-1/2 flex flex-col ">
                        <h2 className="text-lg font-semibold mb-4">지역</h2>
                        <div className="space-y-1 flex-grow">
                            {regions.map((region) => (
                                <button
                                    key={region.name}
                                    className={`w-full py-2 px-4 text-center rounded-md transition-colors ${selectedDo.name === region.name
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                                        }`}
                                    onClick={() => handleRegionSelect(region)}
                                >
                                    {region.name}
                                </button>
                            ))}
                        </div>

                    </div>
                    <div className="w-1/2 flex flex-col">
                        <h2 className="text-lg font-semibold mb-4">세부 지역</h2>
                        <div className="space-y-1 flex-grow mb-2">
                            {selectedDo.districts.map((district) => (
                                <button
                                    key={district.id}
                                    className={`w-full py-2 px-4 text-left rounded-md transition-colors ${selectedGuSi.includes(district.id)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                                        }`}
                                    onClick={() => handleDistrictToggle(district)}
                                >
                                    {district.name}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
                
                <div className='flex items-center h-8'>
                    <div className='flex w-full whitespace-nowrap overflow-x-auto scrollbar-hide'>
                        {chips.length > 0 && chips.map((chip) => (
                            <Chip key={chip} label={chip} className='mr-2'/>
                        ))}
                    </div>
                    <div className='flex justify-end'>
                        <Button
                            variant="text"
                            onClick={handleReset}
                            className="text-gray-600 h-full"
                        >
                            초기화
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleApply}
                            className="bg-blue-500 h-full"
                        >
                            적용
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}