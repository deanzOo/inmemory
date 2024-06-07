"use client";
import { FormattedMessage } from "react-intl";
import MessagesContainer from "./MessagesContainer";
import Link from 'next/link';
import Image from "next/image";

export default function Footer({ locale }: { locale: string }) {
    return (
        <MessagesContainer locale={locale}>
            <div id="footer" className="bg-gray-800 text-white p-4 flex justify-end gap-x-10 mt-auto">
                <Link href='/contact' className="link">
                    <div className="flex flex-col items-center">
                        <Image src="/icons/mail.png" alt="צור קשר" width={25} height={25} />
                        <FormattedMessage tagName="p" id="layout.footer.link.contact" />
                    </div>
                </Link>
                <div className="flex flex-col items-center">
                    <Image src="/icons/wheelchair.png" alt="צור קשר" width={25} height={25} />
                    <span>
                        <FormattedMessage tagName="p" id="layout.footer.link.accessibility" />
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <Image src="/icons/privacy.png" alt="צור קשר" width={25} height={25} />
                    <span>
                        <FormattedMessage tagName="p" id="layout.footer.link.privacy" />
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="mb-2">icon</span>
                    <span>
                        <FormattedMessage tagName="p" id="layout.footer.link.map" />
                    </span>
                </div>
            </div>
        </MessagesContainer>
    );
}
