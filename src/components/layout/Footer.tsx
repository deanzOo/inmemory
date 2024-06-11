"use client";
import { FormattedMessage } from "react-intl";
import MessagesContainer from "../common/MessagesContainer";
import Image from "next/image";
import AppLink from "@/components/common/AppLink";
import mailIcon from "@/public/icons/mail.png";
import accessabilityIcon from "@/public/icons/wheelchair.png";
import privacyIcon from "@/public/icons/privacy.png";
import mapIcon from "@/public/icons/privacy.png";

export default function Footer({ locale }: { locale: string }) {
    return (
        <MessagesContainer locale={locale}>
            <div id="footer" className="bg-gray-800 text-white p-4 flex justify-end gap-x-10 mt-auto">
                <AppLink href='/contact' locale={locale}>
                    <div className="flex flex-col items-center">
                        <Image src={mailIcon} alt="צור קשר" width={25} height={25} />
                        <FormattedMessage tagName="p" id="layout.footer.link.contact" />
                    </div>
                </AppLink>
                <AppLink href='/accessibility' locale={locale}>
                    <div className="flex flex-col items-center">
                        <Image src={accessabilityIcon} alt="נגישות" width={25} height={25} />
                        <FormattedMessage tagName="p" id="layout.footer.link.accessibility" />
                    </div>
                </AppLink>
                <AppLink href='/privacy' locale={locale}>
                    <div className="flex flex-col items-center">
                        <Image src={privacyIcon} alt="פרטיות" width={25} height={25} />
                        <FormattedMessage tagName="p" id="layout.footer.link.privacy" />
                    </div>
                </AppLink>
                <AppLink href='/map' locale={locale}>
                    <div className="flex flex-col items-center">
                        <Image src={mapIcon} alt="מפת אתר" width={25} height={25} />
                        <span>
                            <FormattedMessage tagName="p" id="layout.footer.link.map" />
                        </span>
                    </div>
                </AppLink>
            </div>
        </MessagesContainer>
    );
}
