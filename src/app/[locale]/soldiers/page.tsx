'use client';
import { useState, useEffect } from 'react';

interface Record {
    name: string;
    rank: string;
    unit: string;
    dateOfDeath: string;
    image: string;
}

export default function Gallery() {
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
        // Fetch records from your API
        async function fetchRecords() {
            const response = await fetch('/api/soldiers');
            const data = await response.json();
            setRecords(data.records);
        }
        fetchRecords();
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Gallery</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.map((record, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-4">
                            <h2 className="text-xl font-bold">{record.name}</h2>
                            <p className="text-gray-700">{record.rank}</p>
                            <p className="text-gray-700">{record.unit}</p>
                            <p className="text-gray-700">{record.dateOfDeath}</p>
                        </div>
                        <div className="md:w-1/2">
                            <img src={record.image} alt={record.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
