import {Metadata, ResolvingMetadata} from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import {getDirection, getIntl} from "@/lib/intl";
import {cookies} from "next/headers";
import { AuthProvider } from '@/context/AuthContext';



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
        title: intl.formatMessage({ id: "website.title" }),
        description: intl.formatMessage({
            id: "website.meta.description",
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

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

  return (
    <html lang={locale} dir={dir}>
      <body className={inter.className} dir={dir}>
      <main className="appContainer">
          <AuthProvider token={token}>
              <Navbar locale={locale} token={token} />
              <div className="main-content">
                  <Sidebar locale={locale} />
                  {children}
              </div>
              <Footer locale={locale} />
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
