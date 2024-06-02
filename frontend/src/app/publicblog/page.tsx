'use client';

import React from 'react';
import Blog from "@/app/components/Blog";
import info from "../../../public/info.json";

const PublicBlog = () => {
    let initial_stories = info.stories.filter(story => !story.family)
    const soldiers = info.soldiers;
    initial_stories = initial_stories.map(story => {
        story.image = soldiers.find(soldier => soldier.name === story.soldier_name)?.image ?? '';
        return story;
    });
    return <Blog title='סיפורי נופלים' initial_stories={initial_stories} />
};

export default PublicBlog;
