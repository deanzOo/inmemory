import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json');
    if (response.ok) {
        const json = await response.json();
        return NextResponse.json(json);
    } else {
        return NextResponse.json({ error: 'Failed to fetch Alerts feed' }, { status: 500 });
    }
}
