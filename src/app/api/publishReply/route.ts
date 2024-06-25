import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Story from "@/models/Story";

export async function POST(req: Request) {
    await connectToDatabase();
    const {
        story_id,
        user_name,
        content,
    } = await req.json();

    const story = await Story.findById(story_id);
    if (!story) {
        return NextResponse.json({error: 'Story not found'}, {status: 404});
    }
    story.replies.push({user_name, content});
    try {

        await story.save();
        return NextResponse.json({message: 'Reply published successfully'});
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Error publishing reply'}, {status: 500});
    }
}
