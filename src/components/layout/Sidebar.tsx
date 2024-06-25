"use client";
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";
import AppLink from "@/components/common/AppLink";
import {useAuth} from "@/context/AuthContext";
import SearchBar from "@/components/searchbar/SearchBar";
import './Sidebar.css';

export default function Sidebar({ locale }: { locale: string }) {
    const { user } = useAuth();
    return (
        <MessagesContainer locale={locale}>
            <div className="sidebarContainer">
                    <aside className="sidebar">
                        <AppLink href='/soldiers' locale={locale}>
                            <FormattedMessage id="layout.sidebar.link.soldiers"/>
                        </AppLink>
                        <AppLink href='/familiesblog' locale={locale}>
                            <FormattedMessage id="layout.sidebar.link.familystories"/>
                        </AppLink>
                        <AppLink href='/publicblog' locale={locale} >
                            <FormattedMessage id="layout.sidebar.link.publicstories"/>
                        </AppLink>
                        <AppLink href='/donation' locale={locale}>
                            <FormattedMessage id="layout.sidebar.link.donations"/>
                        </AppLink>
                        <SearchBar locale={locale} width="100%" apiEndpoint="/api/search" />
                        {user && (
                            <AppLink href='/addSoldier' locale={locale}>
                                <FormattedMessage id="layout.sidebar.link.addsoldier"/>
                            </AppLink>
                        )}

                    </aside>
            </div>
        </MessagesContainer>
    );
}
