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
    locale: string;
}

type SoldierWithStories = Soldier & { stories: Story[] };

const SoldierComponent = ({ id, stories_title, candle_title, locale }: SoldierComponentProps) => {
    const [soldier, setSoldier] = useState<SoldierWithStories | null>(null);
    const [candleLit, setCandleLit] = useState<boolean>(false);

    useEffect(() => {
        const loadSoldier = async () => {
            const soldiersData = await (await fetch('/api/soldiers/' + id,
                {
                    headers: {
                        'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                    }
                })).json();
            let soldier = soldiersData.soldier;
            if (!soldier) return; // soldier not found
            const storiesData = await (await fetch('/api/stories/' + id,
                {
                    headers: {
                        'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                    }
                })).json();
            soldier.stories = storiesData.stories;
            setSoldier(soldier);
            setCandleLit(Cookies.get(`candle_${id}`) === 'lit');
        };

        loadSoldier().then(r => r);
    }, [id]);

    if (!soldier) return <div>Loading...</div>;

    return (
        <div className="soldier-container">
            <div>
                <h1 className="title">{soldier.rank + ' ' + soldier.name}</h1>
                <Image src={soldier.image} alt={`${soldier.name}`} width={250} height={250}
                       className="image"/>
                <p className="paragraph">{soldier.unit}</p>
                <p className="paragraph">
                    {formatDate(soldier.dateOfDeath)}
                </p>
            </div>
            <div className="candle_container">
                <div className="candle_frame">
                    <span>{candle_title}</span>
                    <Candle id={soldier._id} headline="" />
                </div>
            </div>
            <div className="stories_container">
                <h2 className="title">{stories_title}</h2>
                {soldier.stories.map(story => (
                    <div key={story._id}>
                        <StoryCard
                            user_name={story.user_name}
                            soldier_name={story.soldier.name}
                            image={story.soldier.image}
                            content={story.content}
                            initialReplies={story.replies}
                            story_id={story._id!}
                            locale={locale}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoldierComponent;
