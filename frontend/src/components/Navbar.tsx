'use client';

import Link from 'next/link';
import { i18n } from "../../i18n-config";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import MessagesContainer from "@/components/MessagesContainer";
import LocalizedLink from "@/components/AppLink";

export default function Navbar({ locale }: { locale: string }) {
    const { locales, defaultLocale } = i18n;

    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleChange = (locale: string) => {
        const path = locale === defaultLocale ? "/" : `/${locale}`;
        router.push(path);
    };

    return (
        <MessagesContainer locale={locale}>
            <div id="header" className="w-full bg-gray-800 text-white p-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-row justify-content-center flex-grow">
                        <FormattedMessage id="layout.header.link.candle"/> |
                        <LocalizedLink locale={locale} href='/' text="layout.header.link.homepage" /> |
                        <LocalizedLink locale={locale} href='/about' text="layout.header.link.about" /> |
                        <FormattedMessage id="layout.header.link.login"/> |
                        <FormattedMessage id="layout.header.link.register"/>
                    </div>
                    <div
                        className="relative languages"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <div className="px-2 cursor-pointer">
                            <FormattedMessage tagName="p" id="layout.header.languages.label"/>
                        </div>
                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-lg">
                                {[...locales].sort().map((localeOption) => (
                                    <div
                                        key={localeOption}
                                        className={`px-4 py-2 cursor-pointer ${localeOption === locale ? "font-bold" : ""}`}
                                        onClick={() => handleChange(localeOption)}
                                    >
                                        <FormattedMessage tagName="p" id={"layout.header.languages." + localeOption}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MessagesContainer>
    );
}
