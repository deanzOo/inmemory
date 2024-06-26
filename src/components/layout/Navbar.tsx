'use client';

import { i18n } from "@/i18n-config";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import MessagesContainer from "@/components/common/MessagesContainer";
import AppLink from "@/components/common/AppLink";
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import './Navbar.css';

export default function Navbar({ locale, token }: { locale: string, token?: string}) {
    const { locales, defaultLocale } = i18n;
    const pathname = usePathname();

    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleChange = (locale: string) => {
        // strip current path of all locales
        const pathWithoutLocale = pathname.replace(new RegExp(`^/(${[...locales].join('|')})`), '');
        // join new locale
        const path = locale === defaultLocale ? '' : `/${locale}`;

        router.push(path + pathWithoutLocale);
    };

    const handleLogout = () => {
        fetch('/api/logout', {
            method: 'GET',
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            }
        }).then(() => {
            logout();
        });
    };

    return (
        <MessagesContainer locale={locale}>
            <div className="navbarContainer">
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
                    <div onClick={handleLogout} className="cursor-pointer">
                        <AppLink locale={locale} href=''>
                            <FormattedMessage id="layout.header.link.logout.hello"/> {user.username}, <FormattedMessage id="layout.header.link.logout"/>
                        </AppLink>
                    </div>
                )}
                <div
                    className="languages"
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
        </MessagesContainer>
    );
}
