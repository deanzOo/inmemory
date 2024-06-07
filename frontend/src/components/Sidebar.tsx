"use client";
import Link from 'next/link';
import MessagesContainer from "@/components/MessagesContainer";
import {FormattedMessage} from "react-intl";

export default function Sidebar({ locale }: { locale: string }) {
    return (
        <aside id="sidebar" className="w-1/8 bg-gray-200 p-4 shadow-md flex flex-col">
            <MessagesContainer locale={locale}>
                <Link className="py-2 link" href='/familiesblog'>
                    <FormattedMessage tagName="p" id="layout.sidebar.link.familystories"/>
                </Link>
                <Link className="py-2 link" href='/publicblog' >
                    <FormattedMessage tagName="p" id="layout.sidebar.link.publicstories"/>
                </Link>
                <span className="py-2">
                    <FormattedMessage tagName="p" id="layout.sidebar.link.donations"/>
                </span>
            </MessagesContainer>
        </aside>
)
    ;
}
