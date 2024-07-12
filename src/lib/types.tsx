export interface Soldier {
    _id: string;
    name: string;
    rank: string;
    image: string;
    unit: string;
    dateOfDeath: string;
    published_by: string;
}

export interface Story {
    _id?: string;
    user_name: string;
    soldier: {
        name: string,
        image: string,
    };
    soldier_id: string,
    content: string;
    family: boolean;
    replies: { story_id: string, content: string; user_name: string; }[];
}

export interface User {
    _id: string;
    userId: string;
    username: string;
}
