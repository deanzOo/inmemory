import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Story from "@/models/Story";
import Soldier from "@/models/Soldier";

export async function POST(req: Request) {
    await connectToDatabase();
    const {
        story_id,
        soldier_id
    } = await req.json();

    if (!story_id && !soldier_id) {
        return NextResponse.json({error: 'Invalid request'}, {status: 400});
    }

    if (story_id) {
        const story = await Story.findById(story_id);
        if (!story) {
            return NextResponse.json({error: 'Story not found'}, {status: 404});
        }
        await story.deleteOne();
        return NextResponse.json({message: 'Story denied successfully'});
    }

    if (soldier_id) {
        const soldier = await Soldier.findById(soldier_id);
        if (!soldier) {
            return NextResponse.json({error: 'Soldier not found'}, {status: 404});
        }
        await soldier.deleteOne();
        return NextResponse.json({message: 'Soldier denied successfully'});
    }

    return NextResponse.json({error: 'Invalid request'}, {status: 400});
}
