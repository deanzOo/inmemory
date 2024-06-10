'use client';
import { useEffect, useState } from 'react';

export default function RSSFeed() {
    const [rssFeed, setRssFeed] = useState([]);

    useEffect(() => {
        async function fetchRSSData() {
            try {
                const response = await fetch('/api/rss-feed');
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
        <div id="rss_feed" className="mb-4 text-center h-48 overflow-y-auto border border-gray-300 shadow-lg p-4 rounded-lg w-25">
            <span className="block mb-2 font-bold">* עדכוני חדשות בזמן אמת *</span>
            <div>
                {rssFeed.length > 0 ? (
                    rssFeed.map((item: {link: string | undefined, title: any}, index) => (
                        <div key={index} className="my-2">
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {item.title}
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
