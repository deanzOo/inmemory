import Parser from 'rss-parser';

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: ({ [key: string]: any; } & Parser.Item)[]): void; new(): any; }; }; }) {
    const parser = new Parser();
    const feed = await parser.parseURL('https://www.ynet.co.il/Integration/StoryRss1854.xml');
    res.status(200).json(feed.items);
}
