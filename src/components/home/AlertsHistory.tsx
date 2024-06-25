'use client';
import { useEffect, useState } from 'react';
import './AlertsHistory.css';

export default function AlertsHistory() {
    const [alertsFeed, setAlertsFeed] = useState([]);

    useEffect(() => {
        async function fetchAlertsFeedData() {
            try {
                const response = await fetch('/api/alerts', {
                    headers: {
                        'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                    }
                });
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
        <div className="feed">
            <span className="alerts_header">* עדכוני צבע אדום אמת *</span>
            <div>
                {alertsFeed.length > 0 ? (
                    alertsFeed.map((item: {alertDate: string | undefined, title: any, data: string}, index) => (
                        <div key={index} className="alerts_container">
                            <span className="link">
                                {item.alertDate}
                            </span>
                            <br/>
                            <span className="link">
                                {item.title}
                            </span>
                            <br/>
                            <span className="link">
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
