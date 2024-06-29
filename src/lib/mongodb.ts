import mongoose from 'mongoose';
import seedAdmin from './seedAdmin';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

// Initialize the mongoose global variable if it doesn't exist
(global as any).mongoose = (global as any).mongoose || { conn: null, promise: null };

async function connectToDatabase() {
    if ((global as any).mongoose.conn) {
        return (global as any).mongoose.conn;
    }

    if (!(global as any).mongoose.promise) {
        (global as any).mongoose.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => {
            return mongoose;
        });
    }
    (global as any).mongoose.conn = await (global as any).mongoose.promise;
    await seedAdmin();
    return (global as any).mongoose.conn;
}

export default connectToDatabase;
