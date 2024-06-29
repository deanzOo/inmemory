import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Soldier from "@/models/Soldier";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToDatabase();
    const body = await req.json();
    const { user_name, name, rank, unit, dateOfDeath, image } = body;
    console.log(body);
    if (!user_name || !name || !rank || !unit || !dateOfDeath || !image) {
        return NextResponse.json({ message: 'All fields are required', code: 1 }, { status: 400 });
    }

    const existingSoldier = await Soldier.findOne({ name, rank, unit });
    if (existingSoldier) {
        return NextResponse.json({ error: 'Soldier already exists', code: 2 }, { status: 400 });
    }

    const newSoldier = new Soldier({
        name,
        rank,
        unit,
        dateOfDeath,
        image,
        published_by: user_name,
        createdAt: new Date(),
        approved: false
    });
    try {
        await newSoldier.save();
        return NextResponse.json({ message: 'Soldier registered successfully', code: 0 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error registering soldier', code: 3 }, { status: 500 });
    }
}
