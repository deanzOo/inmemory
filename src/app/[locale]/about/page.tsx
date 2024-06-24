import React from 'react';
import './About.css';
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";
import {getIntl} from "@/lib/intl";

export default async function About({params: {locale}}: {params: { locale: string }}) {
    const intl = await getIntl(locale);
    return (
        <div className="aboutContainer">
            <h1 className="text-4xl font-bold mb-8">
                {intl.formatMessage({ id: "page.about.header" })}
            </h1>
            <div className="w-full max-w-2xl">
                <p className="mb-4">
                    <MessagesContainer locale={locale}>
                        {intl.formatMessage({ id: "page.about.text" })}
                    </MessagesContainer>
                </p>

            </div>
        </div>
    );
}
