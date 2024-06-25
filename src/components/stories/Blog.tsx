'use client';
import React, {useEffect, useState} from 'react';
import StoryCard from './StoryCard';
import Select from 'react-select';
import {Soldier, Story} from "@/lib/types";
import {useAuth} from "@/context/AuthContext";
import './Blog.css';
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";

const Blog = ({ title, family, locale }: {title: string, family: boolean, locale: string}) => {
    const [soldiers, setSoldiers] = useState<Soldier[]>([]);
    useEffect(() => {
        // Fetch records from your API
        async function fetchSoldiers() {
            const response = await fetch('/api/soldiers', {
                headers: {
                    'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                }
            });
            const data = await response.json();
            setSoldiers(data.soldiers);
        }
        async function fetchStories() {
            const response = await fetch('/api/stories', {
                headers: {
                    'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                }
            });
            const data = await response.json();
            setStories(data.stories.filter((story: Story) => story.family === family));
        }
        fetchSoldiers().then();
        fetchStories().then();
    }, [family]);
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
                    image: selectedSoldier.image,
                },
                solder_id: selectedSoldier._id,
                content: newStory,
                family: family,
                replies: []
            };
            const res = await fetch('/api/publishStory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                },
                body: JSON.stringify(newStoryObject)
            });

            if (res.ok) {
                alert('הצלחה!');
                setStories([newStoryObject, ...stories]);
                setNewStory('');
            } else {
                alert('כישלון: ' + (await res.json()).error || 'שגיאה לא ידועה');
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
        <MessagesContainer locale={locale}>
            <div className="blogContent">
                {user && (
                    <div className="publish_container">
                        <FormattedMessage tagName="label" id="blog.publish.label" />
                        <Select
                            options={soldiers}
                            value={selectedSoldier}
                            onChange={handleSelectChange}
                            getOptionLabel={(option: Soldier) => option.name}
                            getOptionValue={(option: Soldier) => option.name}
                            placeholder=""
                            className="publish_select"
                            isClearable
                        />

                        <textarea
                            className="publish_content"
                            rows={3}
                            value={newStory}
                            onChange={(e) => setNewStory(e.target.value)}
                            placeholder="כתוב סיפור חדש..."
                        ></textarea>
                        <button onClick={handlePublish} className="publish_btn">
                            פרסם
                        </button>
                    </div>
                )}
                {!user && (
                    <p>
                        <FormattedMessage id="blog.loginToPublish" />.
                    </p>
                )}
                <h1 className="blog_title">{title}</h1>
                <div className="blog_search_container">
                    <label>
                        <FormattedMessage id="blog.search.label" />
                    </label>
                    <Select
                        options={soldiers}
                        value={selectedSoldierForStories}
                        onChange={handleSelectSoldierForStories}
                        getOptionLabel={(option: Soldier) => option.name}
                        getOptionValue={(option: Soldier) => option.name}
                        className="blog_search_select"
                        placeholder=""
                        isClearable
                    />
                </div>
                <div className="blog_content">
                    <div>
                        {filteredStories.length > 0 ? (
                            filteredStories.map((story, index) => (
                                <StoryCard
                                    story_id={story._id!}
                                    key={index}
                                    user_name={story.user_name}
                                    soldier_name={story.soldier.name}
                                    image={story.soldier.image}
                                    content={story.content}
                                    initialReplies={story.replies.map(reply => ({
                                        user_name: reply.user_name,
                                        content: reply.content,
                                        story_id: story._id!
                                    }))}
                                />
                            ))
                        ) : (
                            <p>
                                <FormattedMessage id="blog.noStories" />.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </MessagesContainer>
    );
};

export default Blog;
