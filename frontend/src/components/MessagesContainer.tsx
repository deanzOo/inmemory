'use client';
import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

async function getMessages(locale: string) {
    try {
        return await import(`../lang/${locale}.json`);
    } catch (error) {
        console.error(`Error loading messages for locale ${locale}:`, error);
        return null;
    }
}

type MessagesContainerProps = {
    locale: string;
    children: React.ReactNode;
};

const MessagesContainer = ({ locale, children }: MessagesContainerProps) => {
    const [messages, setMessages] = useState<Record<string, string> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMessages() {
            const messages = await getMessages(locale);
            setMessages(messages);
            setLoading(false);
        }
        fetchMessages();
    }, [locale]);

    if (loading || messages === null) {
        return <div>Loading...</div>;
    }

    return (
        <IntlProvider locale={locale} messages={messages}>
            <div>{children}</div>
        </IntlProvider>
    );
};

export default MessagesContainer;
