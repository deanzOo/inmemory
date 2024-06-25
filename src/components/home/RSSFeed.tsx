'use client';
import { useEffect, useState } from 'react';
import './RSSFeed.css';
import AppLink from "@/components/common/AppLink";

export default function RSSFeed({locale}: {locale: string}) {
    const [rssFeed, setRssFeed] = useState([]);

    useEffect(() => {
        async function fetchRSSData() {
            try {
                const response = await fetch('/api/rss-feed', {
                    headers: {
                        'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setRssFeed(data);
                } else {
                    console.error('Failed to fetch RSS feed');
                }
            } catch (error) {
                console.error('Error fetching RSS feed:', error);
                setRssFeed([]);
            }
        }
        fetchRSSData().then(r => r);
    }, []);

    return (
        <div className="feed">
            <span className="rss_header">* עדכוני חדשות בזמן אמת *</span>
            <div>
                {rssFeed.length > 0 ? (
                    rssFeed.map((item: {link: string | undefined, title: any}, index) => (
                        <div key={index} className="rss_link_container">
                            <AppLink href={item.link!} locale={locale}>
                                {item.title}
                            </AppLink>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
