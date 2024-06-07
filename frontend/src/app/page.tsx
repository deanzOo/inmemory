'use client';

import MediaCarousel from "@/app/components/Carousel";
import RSSFeed from "@/app/components/RSSFeed";
import Select from "react-select";
import React, {useState} from "react";
import info from "../../public/info.json";

interface Soldier {
    id: number;
    name: string;
    rank: string;
    image: string;
    unit: string;
}

export default function Home() {
    const soldiers = info.soldiers;
    const [selectedSoldierForStories, setSelectedSoldierForStories] = useState(soldiers[0]);

    const handleSelectSoldierForStories = (newValue: any) => {
        // filter stories by selected soldier
        if (newValue) {
        } else {
        }
    }
    return (
        <div id="content" className="w-4/5 p-5 flex flex-col flex-grow justify-between items-center">
            <h1 className="text-2xl font-bold mb-4 text-center">ברוכים הבאים לאתר הנצחה</h1>

            <div className="w-50 mb-4">
                <label className="block mb-2">חפש נופל...</label>
                <Select
                    options={soldiers}
                    value={selectedSoldierForStories}
                    onChange={handleSelectSoldierForStories}
                    getOptionLabel={(option: Soldier) => option.name}
                    getOptionValue={(option: Soldier) => option.name}
                    placeholder="בחר נופל..."
                    className="p-2 border rounded mb-4"
                    isClearable
                />
            </div>
            <MediaCarousel/>
            <RSSFeed/>
        </div>
    );
}
