'use client';

import { i18n } from "../../../i18n-config";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import MessagesContainer from "@/components/common/MessagesContainer";
import AppLink from "@/components/common/AppLink";
import { useAuth } from '@/context/AuthContext';

export default function Navbar({ locale, token }: { locale: string, token?: string}) {
    const { locales, defaultLocale } = i18n;

    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleChange = (locale: string) => {
        const path = locale === defaultLocale ? "/" : `/${locale}`;
        router.push(path);
    };

    useEffect(() => {
        // Handle any side effects based on the user state
    }, [user]);

    return (
        <MessagesContainer locale={locale}>
            <div id="header" className="w-full bg-gray-800 text-white p-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-row justify-content-center flex-grow">
                        <AppLink locale={locale} href='/candle'>
                            <FormattedMessage id="layout.header.link.candle"/>
                        </AppLink>
                        <AppLink locale={locale} href='/'>
                            <FormattedMessage id="layout.header.link.homepage" />
                        </AppLink>
                        <AppLink locale={locale} href='/about'>
                            <FormattedMessage id="layout.header.link.about"/>
                        </AppLink>
                        {!user && (
                        <AppLink locale={locale} href='/login'>
                            <FormattedMessage id="layout.header.link.login"/>
                        </AppLink>
                        )}
                        {!user && (
                        <AppLink locale={locale} href='/register'>
                            <FormattedMessage id="layout.header.link.register"/>
                        </AppLink>
                        )}
                        {user && (
                            <div onClick={logout} className="cursor-pointer">
                                <AppLink locale={locale} href=''>
                                    <FormattedMessage id="layout.header.link.logout"/>
                                </AppLink>
                            </div>
                        )}
                    </div>
                    <div
                        className="relative languages"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <div className="px-2 cursor-pointer link">
                            <FormattedMessage tagName="p" id="layout.header.languages.label"/>
                        </div>
                        {isDropdownOpen && (
                            <div
                                className="absolute -right-5 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-lg">
                                {[...locales].sort().map((localeOption) => (
                                    <div
                                        key={localeOption}
                                        className={`link px-4 py-2 cursor-pointer ${localeOption === locale ? "font-bold" : ""}`}
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
