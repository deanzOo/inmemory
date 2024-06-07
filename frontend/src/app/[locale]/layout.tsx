import {Metadata, ResolvingMetadata} from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import {getDirection, getIntl} from "@/lib/intl";

const inter = Inter({ subsets: ["latin"] });

type RouteProps = {
    params: { locale: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    props: RouteProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const intl = await getIntl(props.params.locale);
    return {
        title: intl.formatMessage({ id: "page.home.head.title" }),
        description: intl.formatMessage({
            id: "page.home.head.meta.description",
        }),
        alternates: {
            canonical: "https://example.com",
            languages: {
                en: "http://example.com/en",
                he: "http://example.com",
                "x-default": "http://example.com",
            },
        },
    };
}

type LayoutProps = {
    params: { locale: string };
    children: React.ReactNode;
};

export default function RootLayout({ params, children }: LayoutProps) {
    const { locale } = params;
    const dir = getDirection(locale);
  return (
    <html lang={locale} dir={dir}>
      <body className={inter.className} dir={dir}>
      <main id="container" className="flex flex-col">
          <Navbar locale={locale} />
          <div id="main-content">
              <Sidebar locale={locale} />
              {children}
          </div>
          <Footer locale={locale} />
        </main>
      </body>
    </html>
  );
}
