'use client';

import React, { useState } from 'react';
import StoryCard from './StoryCard';
import info from '../../../public/info.json';

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
    const [selectedSoldier, setSelectedSoldier] = useState(soldiers[0].name);
    const [publisher, setPublisher] = useState('');

    const handlePublish = () => {
        if (newStory.trim() !== '') {
            const newStoryObject: Story = {
                user_name: publisher,
                soldier_name: selectedSoldier,
                image: '/images/image1.jpg', // Example image, adjust as needed
                content: newStory,
                replies: []
            };
            setStories([newStoryObject, ...stories]);
            setNewStory('');
            setPublisher('');
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredStories = stories.filter(story =>
        story.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <div className="mb-4">
                <label className="block mb-2">נופל:</label>
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={selectedSoldier}
                    onChange={(e) => setSelectedSoldier(e.target.value)}
                >
                    {soldiers.map((soldier, index) => (
                        <option key={index} value={soldier.id}>
                            {soldier.name}
                        </option>
                    ))}
                </select>
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
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="חפש סיפורים..."
                />
            </div>
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
    );
};

export default Blog;
