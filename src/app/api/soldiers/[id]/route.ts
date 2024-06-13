import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb";
import Soldier from "@/models/Soldier";
import {NextApiRequest} from "next";

export async function GET(req: NextApiRequest, {params}: {params: {id: string}}) {
    await connectToDatabase();
    const { id } = params;
    try {
        const soldier = await Soldier.findById(id);

        return NextResponse.json({ soldier }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
