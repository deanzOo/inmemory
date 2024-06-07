"use client";
import { FormattedMessage } from "react-intl";
import MessagesContainer from "./MessagesContainer";
import Link from 'next/link';
import { i18n } from "../../i18n-config";

export default function AppLink({locale, href, text}: { locale: string, href: string, text: string }) {
    const { locales, defaultLocale } = i18n;
    const url = locale === defaultLocale ? href : `/${locale}/${href}`;
    return (
        <MessagesContainer locale={locale}>
            <Link href={url} className="link px-2">
                <FormattedMessage id={text} />
            </Link>
        </MessagesContainer>
    );
}
