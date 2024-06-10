import { getIntl } from "@/lib/intl";
import MediaCarousel from "@/components/Carousel";
import RSSFeed from "@/components/RSSFeed";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import AlertsHistory from "@/components/AlertsHistory";

type HomeProps = {
    params: { locale: string };
};

export default async function Home({ params: { locale } }: HomeProps) {
    const intl = await getIntl(locale);
    return (
        <div id="content" className="flex flex-column items-center justify-between min-h-max bg-gray-100 w-100">
            <h1 className="text-2xl font-bold mb-4 text-center">
                {intl.formatMessage({ id: "page.home.header" })}
            </h1>
            <div className="w-50 mb-4">
                <label className="block mb-2">
                    {intl.formatMessage({ id: "page.home.search.label" })}
                </label>
            </div>
            <MediaCarousel/>
            <div className="flex flex-row justify-content-evenly w-100">
                <RSSFeed/>
                <AlertsHistory/>
            </div>
        </div>
    );
}
