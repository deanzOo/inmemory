import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Story from "@/models/Story";
import {NextApiRequest} from "next";
import User from "@/models/User";

export async function GET(req: NextApiRequest) {
    await connectToDatabase();
    try {
        const users = (await User.find()).filter(user => {
            return user.admin === false && user.banned === false;
        });

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
