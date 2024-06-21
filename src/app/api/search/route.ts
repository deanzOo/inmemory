import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
    await connectToDatabase();

    const { term } = await request.json();

    // find users starting with the search term
    const users = await User.find({ username: { $regex: `^${term}`, $options: 'i' } });

    return NextResponse.json({ users });
}
