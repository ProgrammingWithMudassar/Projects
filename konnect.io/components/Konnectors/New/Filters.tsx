'use client'
import React, { useState, useEffect } from 'react';
import Drawer from 'react-modern-drawer';
import { TiTick } from 'react-icons/ti';
import Categories from '@/json/Categories.json';

type Props = {
    open: boolean;
    setOpen: (e: boolean) => void;
    onCategoryChange: (categories: string) => void;
};

const NewFilters = ({ open, setOpen, onCategoryChange }: Props) => {
    const [selectedCategories, setSelectedCategories] = useState('');

    const handleCategoryClick = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.replace(`${category},`, ''));
        } else {
            setSelectedCategories(`${selectedCategories}${category},`);
        }
    };

    const formattedSelectedCategories = selectedCategories.endsWith(',') ? selectedCategories.slice(0, -1) : selectedCategories;
    useEffect(() => {
        onCategoryChange(formattedSelectedCategories);
    }, [formattedSelectedCategories, onCategoryChange]);

    return (
        <Drawer
            open={open}
            onClose={() => setOpen(!open)}
            direction='right'
            className='min-w-[300px] h-full overflow-scroll z-1000 hide-scrollbar'
        >
            <div className="w-full h-full bg-white-600 flex justify-start items-start flex-col px-4 py-8 " >
                <h5 className="text:[12px] md:[18px] text-brand-primary text-left font-bold">Filters :</h5>
                <div className="w-full flex justify-center items-start flex-col gap-2 mt-2" >
                    {Categories.map((item, index) => (
                        <div
                            key={index}
                            className={`w-full flex justify-between items-center text-black-500 border-[2px] rounded-full px-3 h-10 cursor-pointer ${selectedCategories.includes(item.value) ? 'bg-gray-300' : ''
                                }`}
                            onClick={() => handleCategoryClick(item.value)}
                        >
                            <h4 className="text-[12px] text-brand-primary font-bold hover:scale-[1.03]">{item.label}</h4>
                            {selectedCategories.includes(item.value) && <TiTick className="text-Black-600 text-brand-primary" size={20} />}
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    );
};

export default NewFilters;
