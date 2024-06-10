import React from 'react';
import Blog from "@/components/Blog";
import info from "../../../../public/info.json";
import {getIntl} from "@/lib/intl";

type PublicBlogProps = {
    params: { locale: string };
};

const PublicBlog = async ({ params: { locale } }: PublicBlogProps) => {
    const intl = await getIntl(locale);
    let initial_stories = info.stories.filter(story => !story.family)
    const soldiers = info.soldiers;
    initial_stories = initial_stories.map(story => {
        story.image = soldiers.find(soldier => soldier.name === story.soldier_name)?.image ?? '';
        return story;
    });
    return <Blog title={intl.formatMessage({ id: "page.publicblog.header" })} initial_stories={initial_stories} />
};

export default PublicBlog;
