import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Soldier from "@/models/Soldier";

export async function GET(request: NextRequest) {
    await connectToDatabase();

    const query = request.nextUrl.searchParams.get('query');

    // find users starting with the search term
    const users = await Soldier.find({ name: { $regex: `^${query}`, $options: 'i' }, approved: true });

    return NextResponse.json({ users });
}
