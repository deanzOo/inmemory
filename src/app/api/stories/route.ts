import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Story from "@/models/Story";
import {NextApiRequest} from "next";

export async function GET(req: NextApiRequest) {
    await connectToDatabase();
    const {solder_id} = req.query;
    try {
        const stories = await Story.find(solder_id ? {solder_id} : {});

        return NextResponse.json({ stories }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
