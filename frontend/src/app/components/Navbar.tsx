import Link from 'next/link';

export default function Navbar() {
    return (
        <div id="header" className="w-full bg-gray-800 text-white p-2">
            <div className="flex justify-between items-center">
                <div className="text-center flex-grow">
                    <span className="px-2">הדלקת נר</span> | <Link className="px-2 link" href='/'>דף הבית</Link> | <Link
                    className="px-2 link" href='/about'>אודות</Link> | <span
                    className="px-2">התחבר</span> | <span
                    className="px-2">הירשם</span>
                </div>
                <span className="px-2">אנגלית</span>
            </div>
        </div>
    );
}
