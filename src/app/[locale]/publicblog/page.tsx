import React from 'react';
import Blog from "@/components/stories/Blog";
import {getIntl} from "@/lib/intl";

type PublicBlogProps = {
    params: { locale: string };
};

const PublicBlog = async ({ params: { locale } }: PublicBlogProps) => {
    const intl = await getIntl(locale);

    return <Blog title={intl.formatMessage({ id: "page.publicblog.header" })} family={false} />
};

export default PublicBlog;
