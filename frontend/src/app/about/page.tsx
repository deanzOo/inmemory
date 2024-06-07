import React from 'react';
import Head from 'next/head';

const About: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full px-4 py-2">
            <h1 className="text-4xl font-bold mb-8">אודותינו</h1>
            <div className="w-full max-w-2xl">
                <p className="mb-4">
                    עמוד זה מוקדש לזכרם של חללי מערכות ההגנה בצבא ההגנה לישראל שנפלו במלחמת חרבות ברזל. האתר נועד להנציח את גבורתם וזכרם של הלוחמים האמיצים שהקריבו את חייהם למען בטחון מדינת ישראל. כאן תוכלו למצוא סיפורי חיים, תמונות וזיכרונות שנאספו ממשפחות, חברים ומפקדים של הנופלים. יחד, נשמור על זכרם ונכבד את מורשתם. אנו מזמינים אתכם לשתף בזיכרונות ובסיפורים אישיים כדי להעשיר ולהוסיף לגלריית הזכרון. יהי זכרם ברוך.
                </p>

            </div>
        </div>
    );
}

export default About;
