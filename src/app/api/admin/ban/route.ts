import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    await connectToDatabase();
    const {
        user_id
    } = await req.json();

    if (!user_id) {
        return NextResponse.json({error: 'Invalid request'}, {status: 400});
    }

    const user = await User.findById(user_id);
    if (!user) {
        return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    user.banned = true;
    try {
        await user.save();
        return NextResponse.json({message: 'User approved successfully'});
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Error approving user'}, {status: 500});
    }
}
