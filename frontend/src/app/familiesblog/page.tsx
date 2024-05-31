'use client';

import React from 'react';
import Blog from "@/app/components/Blog";
import info from "../../../public/info.json";

const FamiliesBlog = () => {
    const initial_stories = info.stories.family;

    return <Blog title="Blog" />;
};

export default FamiliesBlog;
