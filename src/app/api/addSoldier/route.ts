import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Soldier from "@/models/Soldier";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToDatabase();
    const body = await req.json();
    const { user_name, name, rank, unit, dateOfDeath, image } = body;

    if (!user_name || !name || !rank || !unit || !dateOfDeath || !image) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const existingSoldier = await Soldier.findOne({ name, rank, unit });
    if (existingSoldier) {
        return NextResponse.json({ error: 'Soldier already exists' }, { status: 400 });
    }

    const newSoldier = new Soldier({
        name,
        rank,
        unit,
        dateOfDeath,
        image,
        published_by: user_name,
        createdAt: new Date(),
    });
    try {
        await newSoldier.save();
        return NextResponse.json({ message: 'Soldier registered successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error registering soldier' }, { status: 500 });
    }
}
