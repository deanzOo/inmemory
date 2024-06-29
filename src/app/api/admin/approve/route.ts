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
        story.approved = true;
        try {
            await story.save();
            return NextResponse.json({message: 'Story approved successfully'});
        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Error approving story'}, {status: 500});
        }
    }

    if (soldier_id) {
        const soldier = await Soldier.findById(soldier_id);
        if (!soldier) {
            return NextResponse.json({error: 'Soldier not found'}, {status: 404});
        }
        soldier.approved = true;
        try {
            await soldier.save();
            return NextResponse.json({message: 'Soldier approved successfully'});
        } catch (error) {
            console.log(error)
            return NextResponse.json({error: 'Error approving soldier'}, {status: 500});
        }
    }

    return NextResponse.json({error: 'Invalid request'}, {status: 400});
}
