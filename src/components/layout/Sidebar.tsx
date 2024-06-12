"use client";
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";
import AppLink from "@/components/common/AppLink";
import {useAuth} from "@/context/AuthContext";

export default function Sidebar({ locale }: { locale: string }) {
    const { user } = useAuth();
    return (
        <div className="w-1/8 bg-gray-700 p-4 shadow-md">
            <MessagesContainer locale={locale}>
                <aside id="sidebar" className="flex flex-col">
                    <AppLink href='/soldiers' locale={locale}>
                        <FormattedMessage tagName="span" id="layout.sidebar.link.soldiers"/>
                    </AppLink>
                    <AppLink href='/familiesblog' locale={locale}>
                        <FormattedMessage tagName="span" id="layout.sidebar.link.familystories"/>
                    </AppLink>
                    <AppLink href='/publicblog' locale={locale} >
                        <FormattedMessage tagName="span" id="layout.sidebar.link.publicstories"/>
                    </AppLink>
                    <AppLink href='/donations' locale={locale}>
                        <FormattedMessage tagName="span" id="layout.sidebar.link.donations"/>
                    </AppLink>
                    <span>חפש</span>
                    {user && (
                        <AppLink href='/addSoldier' locale={locale}>
                            <FormattedMessage tagName="span" id="layout.sidebar.link.addsoldier"/>
                        </AppLink>
                    )}

                </aside>
            </MessagesContainer>
        </div>

)
    ;
}
