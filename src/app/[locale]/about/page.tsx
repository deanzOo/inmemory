import React from 'react';
import './About.css';
import {getIntl} from "@/lib/intl";

export default async function About({params: {locale}}: {params: { locale: string }}) {
    const intl = await getIntl(locale);
    return (
        <div className="aboutContainer">
            <h1 className="aboutHeader">
                {intl.formatMessage({ id: "page.about.header" })}
            </h1>
            <div className="aboutTextContainer">
                <p className="aboutTextContainer">
                    {intl.formatMessage({ id: "page.about.text" })}
                </p>

            </div>
        </div>
    );
}
