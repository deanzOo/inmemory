'use client';

import React, { useState } from 'react';
import StoryCard from './StoryCard';
import info from '../../../public/info.json';
import Select from 'react-select';

interface Soldier {
    id: number;
    name: string;
    rank: string;
    image: string;
    unit: string;
}

interface BlogProps {
    title: string;
    initial_stories?: Story[];
}

interface Story {
    user_name: string;
    soldier_name: string;
    image: string;
    content: string;
    replies: { content: string; user_name: string; }[];
}

const Blog: React.FC<BlogProps> = ({ title, initial_stories }) => {
    const soldiers: Soldier[] = info.soldiers;
    const [stories, setStories] = useState<Story[]>(initial_stories || []);
    const [newStory, setNewStory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSoldier, setSelectedSoldier] = useState(soldiers[0]);
    const [selectedSoldierForStories, setSelectedSoldierForStories] = useState(soldiers[0]);
    const [publisher, setPublisher] = useState('סטטי זמני');

    const handlePublish = () => {
        if (newStory.trim() !== '') {
            const newStoryObject: Story = {
                user_name: publisher,
                soldier_name: selectedSoldier.name,
                image: '/images/image1.jpg', // Example image, adjust as needed
                content: newStory,
                replies: []
            };
            setStories([newStoryObject, ...stories]);
            setNewStory('');
            setPublisher('');
        }
    };

    const handleSelectChange = (newValue: any) => {
        setSelectedSoldier(newValue);
    }

    const handleSelectSoldierForStories = (newValue: any) => {
        // filter stories by selected soldier
        if (newValue) {
            setStories(initial_stories?.filter(story => newValue.name.includes(story.soldier_name)) || []);
        } else {
            setStories(initial_stories || []);
        }
    }

    const filteredStories = stories.filter(story =>
        story.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="content" className="px-4 align-items-center">
            <div className="w-75 mb-4">
                <label className="block mb-2">נופל:</label>
                <Select
                    options={soldiers}
                    value={selectedSoldier}
                    onChange={handleSelectChange}
                    getOptionLabel={(option: Soldier) => option.name}
                    getOptionValue={(option: Soldier) => option.name}
                    placeholder="בחר נופל..."
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
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <div className="w-75 mb-4">
                <label className="block mb-2">חפש סיפורים על...</label>
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
            <div className="w-75 text-center border border-gray-300 p-4">
                <div>
                    {filteredStories.length > 0 ? (
                        filteredStories.map((story, index) => (
                            <StoryCard
                                key={index}
                                user_name={story.user_name}
                                soldier_name={story.soldier_name}
                                image={story.image}
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
