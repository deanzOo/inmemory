import { NextResponse } from 'next/server';
import {cookies} from "next/headers";

export async function GET() {
    const response = NextResponse.json({ message: 'Logout successful' });
    cookies().delete('token');

    return response;
}
