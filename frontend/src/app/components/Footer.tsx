import Link from 'next/link';
import Image from "next/image";

export default function Footer() {
    return (
        <div id="footer" className="bg-gray-800 text-white p-4 flex justify-end gap-x-10 mt-auto">
            <Link href='/contact' className="link">
                <div className="flex flex-col items-center">
                    <Image src="/icons/mail.png" alt="צור קשר" width={25} height={25} />
                    <span>צור קשר</span>
                </div>
            </Link>
            <div className="flex flex-col items-center">
                <Image src="/icons/wheelchair.png" alt="צור קשר" width={25} height={25} />
                <span>נגישות</span>
            </div>
            <div className="flex flex-col items-center">
                <Image src="/icons/privacy.png" alt="צור קשר" width={25} height={25} />
                <span>פרטיות</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="mb-2">icon</span>
                <span>מפת אתר</span>
            </div>
        </div>
    );
}
