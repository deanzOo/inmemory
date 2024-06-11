'use client';

import React from 'react';
import Blog from "@/components/stories/Blog";
import info from "../../../public/info.json";

const FamiliesBlog = () => {
    let initial_stories = info.stories.filter(story => story.family)
    const soldiers = info.soldiers;
    initial_stories = initial_stories.map(story => {
        story.image = soldiers.find(soldier => soldier.name === story.soldier_name)?.image ?? '';
        return story;
    });

    return <Blog title="סיפורי משפחות" initial_stories={initial_stories} />;
};

export default FamiliesBlog;
