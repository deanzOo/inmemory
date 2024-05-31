'use client';

import React from 'react';
import Blog from "@/app/components/Blog";
import info from "../../../public/info.json";

const PublicBlog = () => {
    const initial_stories = info.stories.public
    return <Blog title='סיפורי נופלים' initial_stories={initial_stories} />
};

export default PublicBlog;
