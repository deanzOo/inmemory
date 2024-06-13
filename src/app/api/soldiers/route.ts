import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Soldier from "@/models/Soldier";
import {NextApiRequest} from "next";

export async function GET(req: NextApiRequest) {
    await connectToDatabase();
    try {
        const soldiers = await Soldier.find({});

        return NextResponse.json({ soldiers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
