import React from 'react';
import './Contact.css';
import {getIntl} from "@/lib/intl";

const Contact = async ({params: {locale}}: {params: {locale: string}}) => {
    const intl = await getIntl(locale);
    const name_placeholder = intl.formatMessage({id: "page.contact.name"});
    const email_placeholder = intl.formatMessage({id: "page.contact.email"});
    const message_placeholder = intl.formatMessage({id: "page.contact.message"});
    return (
        <div className="contact_container">
                <h1>
                    {intl.formatMessage({id: "page.contact.title"})}
                </h1>
                <form className="contact_form">
                    <div className="contact_input_container">
                        <input
                            id="name"
                            type="text"
                            placeholder={name_placeholder}
                        />
                    </div>
                    <div className="contact_input_container">
                        <input
                            id="email"
                            type="email"
                            placeholder={email_placeholder}
                        />
                    </div>
                    <div className="contact_input_container">
                        <textarea
                            id="message"
                            placeholder={message_placeholder}
                            rows={4}
                        />
                    </div>
                    <button
                        className="contact_btn"
                        type="button"
                    >
                        {intl.formatMessage({id: "page.contact.send"})}
                    </button>
                </form>
            </div>
    );
}

export default Contact;
