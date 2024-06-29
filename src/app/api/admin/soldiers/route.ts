import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import {NextApiRequest} from "next";
import Soldier from "@/models/Soldier";

export async function GET(req: NextApiRequest) {
    await connectToDatabase();
    try {
        const soldiers = await Soldier.find({
            $or: [
            {approved: false},
            {approved: {$exists: false}}
        ]
    });

        return NextResponse.json({ soldiers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
