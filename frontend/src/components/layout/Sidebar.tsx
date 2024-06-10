"use client";
import Link from 'next/link';
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";
import AppLink from "@/components/common/AppLink";

export default function Sidebar({ locale }: { locale: string }) {
    return (
        <div className="w-1/8 bg-gray-700 p-4 shadow-md">
            <MessagesContainer locale={locale}>
                <aside id="sidebar" className="flex flex-col">
                    <AppLink href='/familiesblog' locale={locale}>
                        <FormattedMessage tagName="span" id="layout.sidebar.link.familystories"/>
                    </AppLink>
                    <AppLink href='/publicblog' locale={locale} >
                        <FormattedMessage tagName="span" id="layout.sidebar.link.publicstories"/>
                    </AppLink>
                    <AppLink href='/donations' locale={locale}>
                        <FormattedMessage tagName="span" id="layout.sidebar.link.donations"/>
                    </AppLink>
                </aside>
            </MessagesContainer>
        </div>

)
    ;
}
