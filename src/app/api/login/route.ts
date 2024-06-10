import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import {cookies} from "next/headers";
import {SignJWT} from "jose";

const JWT_SECRET = process.env.JWT_SECRET || '';

if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable');
}

export async function POST(request: Request) {
    await connectToDatabase();

    const { username, password } = await request.json();

    if (!username || !password) {
        return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = await new SignJWT({ userId: user._id, username: user.username })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(new TextEncoder().encode(JWT_SECRET));

    const response = NextResponse.json({ message: 'Login successful' });
    cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400,
        path: '/',
    });

    return response;
}
