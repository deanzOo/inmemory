import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside id="sidebar" className="w-1/8 bg-gray-200 p-4 shadow-md flex flex-col">
            <Link className="py-2 link" href='/familiesblog'>
                סיפורי משפחות
            </Link>
            <Link className="py-2 link" href='/publicblog'>
                סיפורי נופלים
            </Link>
            <span className="py-2">טופס תרומות לחיילים</span>
        </aside>
    );
}
