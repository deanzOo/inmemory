"use client";
import Link from 'next/link';
import { i18n } from "@/i18n-config";
import React from "react";

export default function AppLink({locale, href, children}: { locale: string, href: string, children: React.ReactNode; }) {
    const { locales, defaultLocale } = i18n;
    const url = locale === defaultLocale ? href : `/${locale}/${href}`;
    return (
        <Link href={url} className="link px-2 block m-2">
            {children}
        </Link>
    );
}
