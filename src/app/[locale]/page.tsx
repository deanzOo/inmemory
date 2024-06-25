import { getIntl } from "@/lib/intl";
import MediaCarousel from "@/components/home/Carousel";
import RSSFeed from "@/components/home/RSSFeed";
import React from "react";
import AlertsHistory from "@/components/home/AlertsHistory";
import SearchBar from "@/components/searchbar/SearchBar";
import "./Home.css"

type HomeProps = {
    params: { locale: string };
};

export default async function Home({ params: { locale } }: HomeProps) {
    const intl = await getIntl(locale);
    return (
        <div className="homeContainer">
            <h1 className="homeHeader">
                {intl.formatMessage({ id: "page.home.header" })}
            </h1>
            <div className="homeSearchContainer">
                <SearchBar locale={locale} width="100%" apiEndpoint="/api/search" />
            </div>
            <MediaCarousel/>
            <div className="feedsContainer">
                <RSSFeed locale={locale} />
                <AlertsHistory/>
            </div>
        </div>
    );
}
