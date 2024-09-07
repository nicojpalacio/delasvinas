'use client'
import React, { useEffect, useState } from 'react';
import Divider from '../components/Divider';

const Page = () => {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleItems((prevVisibleItems) => {
                const nextIndex = prevVisibleItems.length;
                if (nextIndex < 5) {
                    return [...prevVisibleItems, nextIndex];
                }
                clearInterval(interval);
                return prevVisibleItems;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    const timelineData = [
        {
            year: "1984",
            title: "Finca de las viñas es un proyecto que inicio en 2020",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sapiente illo quaerat, quia neque minus qui libero quo corrupti perspiciatis?",
        },
        {
            year: "1998",
            title: "Un año mas tarde fundamos la posada",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sapiente illo quaerat, quia neque minus qui libero quo corrupti perspiciatis?",
        },
        {
            year: "2001",
            title: "En 2022 fundamos el viñedo",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sapiente illo quaerat, quia neque minus qui libero quo corrupti perspiciatis?",
        },
        {
            year: "2007",
            title: "etc",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sapiente illo quaerat, quia neque minus qui libero quo corrupti perspiciatis?",
        },
        {
            year: "2015",
            title: "etc",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sapiente illo quaerat, quia neque minus qui libero quo corrupti perspiciatis?",
        },
    ];

    return (
        <div>
            
            <div className='h-[60vh] lg:h-[80vh] bg-about bg-cover bg-center bg-no-repeat'>
                <div className="container mx-auto h-full flex justify-center items-end">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-white text-center max-w-[800px] mb-8 text-4xl md:text-5xl lg:text-[64px] uppercase tracking-[2px] leading-tight font-primary">
                            Nuestra Historia
                        </h1>
                    </div>
                </div>
            </div>
            <Divider/>
            <div className='container mt-5'>
                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    {timelineData.map((item, index) => (
                        <li
                            key={index}
                            className={`transition-opacity duration-1000 ease-in-out ${visibleItems.includes(index) ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <circle cx="10" cy="10" r="10" fill="#99A134" />
                                </svg>
                            </div>
                            <div className={`timeline-${index % 2 === 0 ? 'start' : 'end'} mb-10 md:text-${index % 2 === 0 ? 'end' : 'start'}`}>
                                <div className="text-lg font-black text-accent">{item.title}</div>
                                {item.description}
                            </div>
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default Page;