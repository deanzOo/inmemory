'use client';
import React, {useEffect, useState} from 'react';
import StoryCard from './StoryCard';
import Select from 'react-select';
import {Soldier, Story} from "@/lib/types";
import {useAuth} from "@/context/AuthContext";
import './Blog.css';
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";
import PublishModal from "@/components/stories/PublishModal";

const Blog = ({ title, family, locale }: {title: string, family: boolean, locale: string}) => {
    const { user } = useAuth();
    const [soldiers, setSoldiers] = useState<Soldier[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [stories, setStories] = useState<Story[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSoldierForStories, setSelectedSoldierForStories] = useState<Soldier | null>(null);
    const [publishedMessage, setPublishMessage] = useState(false);

    useEffect(() => {
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


    const handlePublish = async (newStory: Story) => {
        setPublishMessage(true);
        setModalOpen(false);
    };

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
                    <div>
                        <div className="publish_container">
                            <button onClick={() => setModalOpen(true)} className="publish_button">
                                <FormattedMessage id="blog.publishNewStory" />
                            </button>
                            <PublishModal
                                isOpen={isModalOpen}
                                onClose={() => setModalOpen(false)}
                                onSubmit={handlePublish}
                                family={family}
                                soldiers={soldiers}
                            />
                        </div>
                        {publishedMessage && (
                            <span className="publish_success_message">
                                <FormattedMessage id="blog.publishSuccessMessage" />
                            </span>
                        )}
                    </div>
                )}
                <div className={isModalOpen ? 'blur' : ''}>
                    {!user && (
                        <p>
                            <FormattedMessage id="blog.loginToPublish"/>.
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
                                        locale={locale}
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
            </div>
        </MessagesContainer>
    );
};

export default Blog;
