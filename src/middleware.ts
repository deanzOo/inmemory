import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { i18n } from "./i18n-config";
import type { I18nConfig } from "./i18n-config";

function getLocale(request: NextRequest, i18nConfig: I18nConfig): string {
    const { locales, defaultLocale } = i18nConfig;

    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    const { locales, defaultLocale } = i18n;
    const pathname = request.nextUrl.pathname;

    if (
        [
            '/favicon.ico',
            '/icons/mail.png',
        ].includes(pathname)
    )
        return NextResponse.next();

    if (pathname.startsWith('/api')) {
        const token = request.headers.get('authorization');
        if (token !== process.env.NEXT_PUBLIC_API_SECRET) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }
        return NextResponse.next();
    }

    let response;
    let nextLocale;

    const pathLocale = locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    nextLocale = pathLocale;

    if (!pathLocale) {
        const isFirstVisit = !request.cookies.has("NEXT_LOCALE");

        const locale = isFirstVisit ? getLocale(request, i18n) : defaultLocale;

        let newPath = `${locale}${pathname}`;
        if (request.nextUrl.search) newPath += request.nextUrl.search;

        response =
            locale === defaultLocale
                ? NextResponse.rewrite(new URL(newPath, request.url))
                : NextResponse.redirect(new URL(newPath, request.url));
        nextLocale = locale;
    }

    if (!response) response = NextResponse.next();

    if (nextLocale) response.cookies.set("NEXT_LOCALE", nextLocale);

    return response;
}

export const config = {
    matcher: "/((?!gg|_next/static|_next/image|img/|favicon.ico).*)",
};
