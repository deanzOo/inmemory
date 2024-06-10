import { jwtVerify, JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || '';

if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable');
}

export interface UserPayload extends JWTPayload {
    userId: string;
    username: string;
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET), { algorithms: ['HS256'] });
        return payload as UserPayload;
    } catch (err) {
        console.error('JWT verification failed:', err);
        return null;
    }
}
