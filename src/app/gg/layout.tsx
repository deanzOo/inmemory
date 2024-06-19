import { Inter } from "next/font/google";
import {getDirection, getIntl} from "@/lib/intl";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
    params: { locale: string };
    children: React.ReactNode;
};

export default function GGLayout({ params, children }: LayoutProps) {
    const { locale } = params;
    const dir = getDirection(locale);

    return (
        <html lang={locale} dir={dir}>
        <body className={inter.className} dir={dir}>
        <main>
            {children}
        </main>
        </body>
        </html>
    );
}
