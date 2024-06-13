import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Story from "@/models/Story";
import {NextApiRequest} from "next";

export async function GET(req: NextApiRequest, {params}: {params: {soldier_id: string}}) {
    await connectToDatabase();
    const {soldier_id} = params;
    try {
        const stories = await Story.find({soldier_id});

        return NextResponse.json({ stories }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
