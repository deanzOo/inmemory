import { useEffect, useState } from 'react';
import './Soldier.css';
import {Soldier, Story} from "@/lib/types";
import Cookies from 'js-cookie';

interface SoldierComponentProps {
    id: string;
}

type SoldierWithStories = Soldier & { stories: Story[] };

const SoldierComponent = ({ id }: SoldierComponentProps) => {
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
        <div className="soldier-container">
            <h1>{soldier.name}</h1>
            <img src={soldier.image} alt={`${soldier.name}`} />
            <p>Rank: {soldier.rank}</p>
            <p>Unit: {soldier.unit}</p>
            <p>Date of Death: {soldier.dateOfDeath}</p>
            <div className="candle" onClick={handleCandleClick}>
                {candleLit ? '🕯️' : '🕯️ (unlit)'}
            </div>
            <div className="stories">
                <h2>Stories</h2>
                {soldier.stories.map(story => (
                    <p key={story._id}>{story.content}</p>
                ))}
            </div>
        </div>
    );
};

export default SoldierComponent;
