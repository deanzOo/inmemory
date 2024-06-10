import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    // Here, you would handle storing the user in your database
    // For example, you could use Prisma, Mongoose, or any other database client

    if (username && password) {
        // Perform database operations here
        return NextResponse.json({ message: 'User registered successfully' });
    } else {
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
}
