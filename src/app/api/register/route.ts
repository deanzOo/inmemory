import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await connectToDatabase();

    const { username, password } = await request.json();

    if (!username || !password) {
        return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });

    try {
        await newUser.save();
        return NextResponse.json({ message: 'User registered successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
    }
}
