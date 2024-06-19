'use client';
import { useEffect, useState } from 'react';
import './Soldier.css';
import {Soldier, Story} from "@/lib/types";
import Cookies from 'js-cookie';
import {formatDate} from "@/lib/helpers";
import Image from "next/image";
import Candle from "@/components/candle/Candle";
import StoryCard from "@/components/stories/StoryCard";

interface SoldierComponentProps {
    id: string;
    stories_title: string;
    candle_title: string;
}

type SoldierWithStories = Soldier & { stories: Story[] };

const SoldierComponent = ({ id, stories_title, candle_title }: SoldierComponentProps) => {
    const [soldier, setSoldier] = useState<SoldierWithStories | null>(null);
    const [candleLit, setCandleLit] = useState<boolean>(false);

    useEffect(() => {
        const loadSoldier = async () => {
            const soldiersData = await (await fetch('/api/soldiers/' + id)).json();
            let soldier = soldiersData.soldier;
            if (!soldier) return; // soldier not found
            const storiesData = await (await fetch('/api/stories/' + id)).json();
            soldier.stories = storiesData.stories;
            setSoldier(soldier);
            setCandleLit(Cookies.get(`candle_${id}`) === 'lit');
        };

        loadSoldier();
    }, [id]);

    const handleCandleClick = () => {
        setCandleLit(!candleLit);
        Cookies.set(`candle_${id}`, !candleLit ? 'lit' : 'unlit', { expires: 1 });
    };

    if (!soldier) return <div>Loading...</div>;

    return (
        <div className="flex flex-row justify-content-between p-5 w-100 h-100">
            <div>
                <h1 className="text-2xl title">{soldier.rank + ' ' + soldier.name}</h1>
                <Image src={soldier.image} alt={`${soldier.name}`} width={250} height={250}
                       className="border-2 rounded-5 my-10"/>
                <p className="mt-2">{soldier.unit}</p>
                <p className="mt-2">
                    {formatDate(soldier.dateOfDeath)}
                </p>
            </div>
            <div className="relative w-50 mx-10">
                <div className="absolute bottom-10 right-0 w-100 h-75 mb-10">
                    <span>{candle_title}</span>
                    <Candle id={soldier._id} headline="" />
                </div>
            </div>
            <div className="overflow-auto">
                <h2 className="text-xl title text-center">{stories_title}</h2>
                {soldier.stories.map(story => (
                    <div key={story._id} className="mt-4">
                        <StoryCard user_name={story.user_name} soldier_name={story.soldier.name} image={story.soldier.image} content={story.content} initialReplies={story.replies} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoldierComponent;
