'use client';
import { useState } from 'react';
import './Candle.css'; // Import the CSS file

export default function Candle() {
    const [isLit, setIsLit] = useState(false);

    const toggleCandle = () => {
        setIsLit(!isLit);
    };

    return (
        <div className="appcontainer" onClick={toggleCandle}>
            <div className="title flex flex-column justify-content-center">
                <p>יזכור</p>
            </div>
            <div className="candle">
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
