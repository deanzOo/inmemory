'use client';

import React from 'react';
import Blog from "@/components/stories/Blog";

const FamiliesBlog = () => {
    let initial_stories = [
        { "id": 1, "title": "כותרת ראשית", "content": "תוכן ראשי", "user_name": "דין", "soldier_name": "ארנון זמורה", "image": "https://static.wixstatic.com/media/ea2fc8_fcd189bc780f4011868ce0bc3c3a0d59~mv2.jpg/v1/fill/w_480,h_480,al_c,lg_1,q_80,enc_auto/___________%20(14).jpg",
            "family": true,
            "replies": [
                { "content": "תגובה ראשית", "user_name": "שרון" },
                { "content": "תגובה שניה", "user_name": "דין" }
            ]
        },
        {
            "id": 2,
            "title": "כותרת שניה",
            "content": "תוכן שני",
            "user_name": "שרון",
            "soldier_name": "זייד מזאריב",
            "family": true,
            "image": "https://static.wixstatic.com/media/352c83_7ce6f93a2bcb4368bd1be3f767f1e7b4~mv2.jpg/v1/fill/w_480,h_480,al_c,lg_1,q_80,enc_auto/____________________.jpg",
            "replies": [
                {
                    "content": "תגובה ראשית",
                    "user_name": "דין"
                },
                {
                    "content": "תגובה שניה",
                    "user_name": "שרון"
                }
            ]
        },
        { "id": 3, "title": "כותרת ראשית", "content": "תוכן ראשי", "user_name": "דין", "soldier_name": "פלוני אלמוני", "family": false, "image": "/images/image1.jpg", "replies": [
                { "content": "תגובה ראשית", "user_name": "שרון" },
                { "content": "תגובה שניה", "user_name": "דין" }
            ] },
        { "id": 4, "title": "כותרת שניה", "content": "תוכן שני", "user_name": "שרון", "soldier_name": "פלונית אלמונית", "family": false, "image": "/images/image2.jpg", "replies": [
                { "content": "תגובה ראשית", "user_name": "דין" },
                { "content": "תגובה שניה", "user_name": "שרון" }
            ] }
    ].filter(story => story.family)
    const soldiers = [
        { "id": 1, "name": "ארנון זמורה", "rank": "פקד", "unit": "ימ\"מ", "image": "https://static.wixstatic.com/media/ea2fc8_fcd189bc780f4011868ce0bc3c3a0d59~mv2.jpg/v1/fill/w_480,h_480,al_c,lg_1,q_80,enc_auto/___________%20(14).jpg" },
        { "id": 2, "name": "זייד מזאריב", "rank": "רס\"מ", "unit": "חיל הגנת הגבולות", "image": "https://static.wixstatic.com/media/352c83_7ce6f93a2bcb4368bd1be3f767f1e7b4~mv2.jpg/v1/fill/w_480,h_480,al_c,lg_1,q_80,enc_auto/____________________.jpg" }
    ];
    initial_stories = initial_stories.map(story => {
        story.image = soldiers.find(soldier => soldier.name === story.soldier_name)?.image ?? '';
        return story;
    });

    return <Blog title="סיפורי משפחות" family={true} />;
};

export default FamiliesBlog;
