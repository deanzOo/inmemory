export interface Soldier {
    id: number;
    name: string;
    rank: string;
    image: string;
    unit: string;
}

export interface BlogProps {
    title: string;
    family: boolean;
}

export interface Story {
    user_name: string;
    soldier: {
        name: string,
        image: string
    };
    content: string;
    family: boolean;
    replies: { content: string; user_name: string; }[];
}

export interface User {
    userId: string;
    username: string;
}
