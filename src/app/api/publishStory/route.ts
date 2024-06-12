import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Story from "@/models/Story";

export async function POST(req: Request) {
    await connectToDatabase();
    const {
        user_name,
        soldier,
        content,
        family,
        replies
    } = await req.json();
    const newStory = new Story({
        user_name,
        soldier,
        content,
        family,
        replies
    });

    try {
        await newStory.save();
        return NextResponse.json({message: 'Story published successfully'});
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Error publishing story'}, {status: 500});
    }
}
