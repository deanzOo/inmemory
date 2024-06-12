'use client';

import React, {useEffect, useState} from 'react';
import StoryCard from './StoryCard';
import Select from 'react-select';
import {BlogProps, Soldier, Story} from "@/lib/types";
import {useAuth} from "@/context/AuthContext";
import {router} from "next/client";

const Blog: React.FC<BlogProps> = ({ title, family }) => {
    const [soldiers, setSoldiers] = useState<Soldier[]>([]);
    useEffect(() => {
        // Fetch records from your API
        async function fetchSoldiers() {
            const response = await fetch('/api/soldiers');
            const data = await response.json();
            setSoldiers(data.soldiers);
        }
        async function fetchStories() {
            const response = await fetch('/api/stories');
            const data = await response.json();
            setStories(data.stories.filter((story: Story) => story.family === family));
        }
        fetchSoldiers();
        fetchStories();
    }, []);
    const [stories, setStories] = useState<Story[]>([]);
    const [newStory, setNewStory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null);
    const [selectedSoldierForStories, setSelectedSoldierForStories] = useState<Soldier | null>(null);
    const { user } = useAuth();

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && selectedSoldier && newStory.trim() !== '') {
            const newStoryObject: Story = {
                user_name: user.username,
                soldier: {
                    name: selectedSoldier.name,
                    image: selectedSoldier.image
                },
                content: newStory,
                family: family,
                replies: []
            };
            const res = await fetch('/api/publishStory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStoryObject)
            });

            if (res.ok) {
                alert('Publish successful!');
                setStories([newStoryObject, ...stories]);
                setNewStory('');
            } else {
                alert('Publish failed: ' + (await res.json()).error || 'Unknown error');
            }
        }
    };

    const handleSelectChange = (newValue: any) => {
        setSelectedSoldier(newValue);
    }

    const handleSelectSoldierForStories = (newValue: any) => {
        // filter stories by selected soldier
        if (newValue) {
            setStories(stories?.filter(story => newValue.name.includes(story.soldier.name)) || []);
        } else {
            setStories(stories || []);
        }
    }

    const filteredStories = stories.filter(story =>
        story.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="content" className="px-4 align-items-center">
            {user && (
                <div className="w-75 mb-4">
                    <label className="block mb-2">חייל:</label>
                    <Select
                        options={soldiers}
                        value={selectedSoldier}
                        onChange={handleSelectChange}
                        getOptionLabel={(option: Soldier) => option.name}
                        getOptionValue={(option: Soldier) => option.name}
                        placeholder="בחר חייל..."
                        className="w-full p-2 border rounded mb-4"
                        isClearable
                    />

                    <textarea
                        className="w-full p-2 border rounded"
                        rows={3}
                        value={newStory}
                        onChange={(e) => setNewStory(e.target.value)}
                        placeholder="כתוב סיפור חדש..."
                    ></textarea>
                    <button onClick={handlePublish} className="mt-2 p-2 bg-blue-500 text-white rounded">
                        פרסם
                    </button>
                </div>
            )}
            {!user && (
                <p>התחבר כדי לפרסם סיפורים חדשים.</p>
            )}
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <div className="w-75 mb-4">
                <label className="block mb-2">חפש סיפורים על...</label>
                <Select
                    options={soldiers}
                    value={selectedSoldierForStories}
                    onChange={handleSelectSoldierForStories}
                    getOptionLabel={(option: Soldier) => option.name}
                    getOptionValue={(option: Soldier) => option.name}
                    placeholder="בחר חלל..."
                    className="p-2 border rounded mb-4"
                    isClearable
                />
            </div>
            <div className="w-75 text-center border border-gray-300 p-4">
                <div>
                    {filteredStories.length > 0 ? (
                        filteredStories.map((story, index) => (
                            <StoryCard
                                key={index}
                                user_name={story.user_name}
                                soldier_name={story.soldier.name}
                                image={story.soldier.image}
                                content={story.content}
                                initialReplies={story.replies}
                            />
                        ))
                    ) : (
                        <p>No stories found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blog;
