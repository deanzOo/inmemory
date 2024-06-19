'use client';
import {useEffect, useState} from 'react';
import './Candle.css'; // Import the CSS file

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
};

const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export default function Candle({ id, headline }: { id?: string, headline: string }) {
    const [isLit, setIsLit] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const litTime = getCookie(`candle_${id}`);
        if (litTime) {
            const litDate = new Date(litTime);
            const now = new Date();
            const diff = 24 * 60 * 60 * 1000 - (now.getTime() - litDate.getTime());
            if (diff > 0) {
                setIsLit(true);
                setCounter(diff);
            } else {
                setCookie(`candle_${id}`, '', -1);
            }
        }
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLit) {
            timer = setInterval(() => {
                setCounter(prev => {
                    if (prev <= 1000) {
                        setIsLit(false);
                        setCookie(`candle_${id}`, '', -1);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isLit]);

    const toggleCandle = () => {
        if (!isLit) {
            setIsLit(true);
            const now = new Date();
            setCookie(`candle_${id}`, now.toUTCString(), 1);
            setCounter(24 * 60 * 60 * 1000);
        }
    };

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="candlecontainer">
            <div className="counter">
                <p>{headline}</p>
                {isLit && <p>{formatTime(counter)}</p>}
            </div>
            <div className='candle' onClick={toggleCandle}>
                <div className="flame">
                    {isLit && (
                        <>
                            <div className="shadows"></div>
                            <div className="top"></div>
                            <div className="middle"></div>
                            <div className="bottom-lit"></div>
                        </>
                    )}
                    {!isLit && (
                        <div className="bottom"></div>
                    )}
                </div>
                {isLit && (
                    <div className="wick-lit"></div>
                )}
                {!isLit && (
                    <div className="wick"></div>
                )}
                <div className="wax"></div>
            </div>
        </div>
    );
}
