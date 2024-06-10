export interface Soldier {
    id: number;
    name: string;
    rank: string;
    image: string;
    unit: string;
}

export interface BlogProps {
    title: string;
    initial_stories?: Story[];
}

export interface Story {
    user_name: string;
    soldier_name: string;
    image: string;
    content: string;
    replies: { content: string; user_name: string; }[];
}

export interface User {
    userId: string;
    username: string;
}
