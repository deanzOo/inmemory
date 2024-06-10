'use client';
import { useEffect, useState } from 'react';

export default function AlertsHistory() {
    const [alertsFeed, setAlertsFeed] = useState([]);

    useEffect(() => {
        async function fetchAlertsFeedData() {
            try {
                const response = await fetch('/api/alerts');
                if (response.ok) {
                    const data = await response.json();
                    setAlertsFeed(data);
                } else {
                    console.error('Failed to fetch Alerts feed');
                }
            } catch (error) {
                console.error('Error fetching Alerts feed:', error);
                setAlertsFeed([]);
            }
        }
        fetchAlertsFeedData().then(r => r);
    }, []);

    return (
        <div id="alerts_feed" className="mb-4 text-center h-48 overflow-y-auto border border-gray-300 shadow-lg p-4 rounded-lg w-25">
            <span className="block mb-2 font-bold">* עדכוני צבע אדום אמת *</span>
            <div>
                {alertsFeed.length > 0 ? (
                    alertsFeed.map((item: {alertDate: string | undefined, title: any, data: string}, index) => (
                        <div key={index} className="my-2">
                            <span className="text-blue-600 hover:underline">
                                {item.alertDate}
                            </span>
                            <br/>
                            <span className="text-blue-600 hover:underline">
                                {item.title}
                            </span>
                            <br/>
                            <span className="text-blue-600 hover:underline">
                                {item.data}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
