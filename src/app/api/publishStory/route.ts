import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Story from "@/models/Story";

export async function POST(req: Request) {
    await connectToDatabase();
    const data = await req.json();
    const newStory = new Story({
        user_name: data.user_name,
        soldier: data.soldier,
        soldier_id: data.soldier_id,
        content: data.content,
        family: data.family,
        replies: data.replies
    });

    try {
        await newStory.save();
        return NextResponse.json({message: 'Story published successfully'});
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'error.publishing.story'}, {status: 500});
    }
}
