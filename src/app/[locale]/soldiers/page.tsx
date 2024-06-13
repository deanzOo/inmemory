'use client';
import { useState, useEffect } from 'react';
import Card from "@/components/gallery/Card";
import {Soldier} from "@/lib/types";

type GalleryParams = {
    params: {
        locale: string;
    };
}

export default function Gallery({params: {locale}}: GalleryParams) {
    const [soldiers, setSoldiers] = useState<Soldier[]>([]);

    useEffect(() => {
        async function fetchSoldiers() {
            const response = await fetch('/api/soldiers');
            const data = await response.json();
            setSoldiers(data.soldiers);
        }
        fetchSoldiers();
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Gallery</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldiers.map((soldier, index) => (
                    <Card locale={locale} key={index} soldier={soldier} />
                ))}
            </div>
        </div>
    );
}
