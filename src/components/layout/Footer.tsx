"use client";
import { FormattedMessage } from "react-intl";
import MessagesContainer from "../common/MessagesContainer";
import Image from "next/image";
import AppLink from "@/components/common/AppLink";

export default function Footer({ locale }: { locale: string }) {
    return (
        <MessagesContainer locale={locale}>
            <div id="footer" className="bg-gray-800 text-white p-4 flex justify-end gap-x-10 mt-auto">
                <AppLink href='/contact' locale={locale}>
                    <div className="flex flex-col items-center">
                        <Image src='/icons/mail.png' alt="צור קשר" width={25} height={25} />
                        <FormattedMessage tagName="p" id="layout.footer.link.contact" />
                    </div>
                </AppLink>
                <AppLink href='/accessibility' locale={locale}>
                    <div className="flex flex-col items-center">
                        <Image src='/icons/wheelchair.png' alt="נגישות" width={25} height={25} />
                        <FormattedMessage tagName="p" id="layout.footer.link.accessibility" />
                    </div>
                </AppLink>
                <AppLink href='/privacy' locale={locale}>
                    <div className="flex flex-col items-center">
                        <Image src='/icons/privacy.png' alt="פרטיות" width={25} height={25} />
                        <FormattedMessage tagName="p" id="layout.footer.link.privacy" />
                    </div>
                </AppLink>
                <AppLink href='/map' locale={locale}>
                    <div className="flex flex-col items-center">
                        <Image src='/icons/map.png' alt="מפת אתר" width={25} height={25} />
                        <span>
                            <FormattedMessage tagName="p" id="layout.footer.link.map" />
                        </span>
                    </div>
                </AppLink>
            </div>
        </MessagesContainer>
    );
}
