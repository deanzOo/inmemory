"use client";
import { FormattedMessage } from "react-intl";
import MessagesContainer from "@/components/common/MessagesContainer";
import Image from "next/image";
import AppLink from "@/components/common/AppLink";
import './Footer.css';

export default function Footer({ locale }: { locale: string }) {
    return (
        <MessagesContainer locale={locale}>
            <div className="footerContainer">
                <AppLink href='/contact' locale={locale}>
                    <div className="footerItem">
                        <Image src='/icons/mail.png' alt="צור קשר" width={25} height={25} />
                        <FormattedMessage id="layout.footer.link.contact" />
                    </div>
                </AppLink>
            </div>
        </MessagesContainer>
    );
}
