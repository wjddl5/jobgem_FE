import { Button, Dialog } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

export default function CarrerModal({ open, setOpen, carrer, setSelectedCarrer }) {
    const value = 100 / (carrer.length - 1);

    const [sliderValue, setSliderValue] = useState(0);

    const carrerList = carrer.map((carrer, index) => ({
        label: carrer.crName,
        id: carrer.id,
        value: value * index
    }));

    const valuetext = (value) => {
        return `${value}`;
    }

    const handleCarrerChange = (event, newValue) => {
        setSliderValue(newValue);
    }

    const handleReset = () => {
        setSliderValue(0);
        setSelectedCarrer([]);
        setOpen(false);
    }

    const handleCarrerApply = () => {
        const carrerId = carrerList.find(carrer => carrer.value === sliderValue).id;
        setSelectedCarrer([carrerId]);
        setOpen(false);
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth={'sm'} >
            <div className='flex flex-col p-6'>
                <h2 className="text-lg font-semibold mb-4">경력</h2>
                <div className="flex w-full p-8 mb-4">
                    <Slider
                        aria-label="Always visible"
                        value={sliderValue}
                        getAriaValueText={valuetext}
                        step={value}
                        marks={carrerList}
                        onChange={handleCarrerChange}
                    />
                </div>

                <div className='flex h-8 w-full justify-end'>
                    <Button
                        variant="text"
                        onClick={handleReset}
                        className="text-gray-600 h-full"
                    >
                        초기화
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-blue-500 h-full"
                        onClick={handleCarrerApply}
                    >
                        적용
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
