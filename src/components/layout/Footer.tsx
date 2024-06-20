"use client";
import { FormattedMessage } from "react-intl";
import MessagesContainer from "../common/MessagesContainer";
import Image from "next/image";
import AppLink from "@/components/common/AppLink";

export default function Footer({ locale }: { locale: string }) {
    return (
        <MessagesContainer locale={locale}>
            <div className="bg-gray-800 text-white p-4 flex justify-end gap-x-10 mt-auto">
                <AppLink href='/contact' locale={locale}>
                    <div className="flex flex-col items-center">
                        <Image src='/icons/mail.png' alt="צור קשר" width={25} height={25} />
                        <FormattedMessage tagName="p" id="layout.footer.link.contact" />
                    </div>
                </AppLink>
            </div>
        </MessagesContainer>
    );
}
