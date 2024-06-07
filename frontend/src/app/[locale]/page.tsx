import { getIntl } from "@/lib/intl";
import MediaCarousel from "@/components/Carousel";
import RSSFeed from "@/components/RSSFeed";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";

type RouteProps = {
    params: { locale: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    props: RouteProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        alternates: {
            canonical: "https://example.com",
            languages: {
                en: "http://example.com/en",
                he: "http://example.com",
                "x-default": "http://example.com",
            },
        },
    };
}

type HomeProps = {
    params: { locale: string };
};

export default async function Home({ params: { locale } }: HomeProps) {
    const intl = await getIntl(locale);
    return (
        <div id="content" className="w-4/5 p-5 flex flex-col flex-grow justify-between items-center">
            <h1 className="text-2xl font-bold mb-4 text-center">
                {intl.formatMessage({ id: "page.home.header" })}
            </h1>
            <div className="w-50 mb-4">
                <label className="block mb-2">
                    {intl.formatMessage({ id: "page.home.search.label" })}
                </label>
            </div>
            <MediaCarousel/>
            <RSSFeed/>
        </div>
    );
}
