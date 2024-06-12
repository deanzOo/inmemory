import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Story from "@/models/Story";

export async function GET(req: Request) {
    await connectToDatabase();
    try {
        const stories = await Story.find({});

        return NextResponse.json({ stories }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
