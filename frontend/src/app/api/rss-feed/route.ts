import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET() {
    const parser = new Parser();
    try {
        const feed = await parser.parseURL('https://www.ynet.co.il/Integration/StoryRss1854.xml');
        return NextResponse.json(feed.items);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch RSS feed' }, { status: 500 });
    }
}
