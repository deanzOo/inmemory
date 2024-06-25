'use client';
import React, { useState } from 'react';
import './Donation.css'
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";

const DonationPage = ({params: {locale}}: {params: { locale: string }}) => {
    const [donationAmount, setDonationAmount] = useState(50);
    const [donorName, setDonorName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [preferredUnit, setPreferredUnit] = useState('');
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setReply('THANK YOU! תודה לך!')
    };

    return (
        <MessagesContainer locale={locale}>
            <div className="form_container">
                {reply && <div className="reply">{reply}</div>}
                <h1 className="form_header">
                    <FormattedMessage id="page.donation.header" />
                </h1>
                <form onSubmit={handleSubmit} className="form_styling">
                    <div>
                        <label htmlFor="donationAmount" className="form_label">
                            <FormattedMessage id="page.donation.label.amount" />: ₪{donationAmount}
                        </label>
                        <input
                            type="range"
                            id="donationAmount"
                            name="donationAmount"
                            min="1"
                            max="100"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(Number(e.target.value))}
                            className="form_slider"
                        />
                    </div>
                    <div>
                        <label htmlFor="donorName" className="form_label">
                            <FormattedMessage id="page.donation.label.name" />
                        </label>
                        <input
                            type="text"
                            id="donorName"
                            name="donorName"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            required
                            className="form_input"
                        />
                    </div>
                    <div>
                        <label htmlFor="contactInfo" className="form_label">
                            <FormattedMessage id="page.donation.label.contact" />
                        </label>
                        <input
                            type="text"
                            id="contactInfo"
                            name="contactInfo"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            required
                            className="form_input"
                        />
                    </div>
                    <div>
                        <label htmlFor="preferredUnit" className="form_label">
                            <FormattedMessage id="page.donation.label.unit" />
                        </label>
                        <input
                            type="text"
                            id="preferredUnit"
                            name="preferredUnit"
                            value={preferredUnit}
                            onChange={(e) => setPreferredUnit(e.target.value)}
                            className="form_input"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="form_label">
                            <FormattedMessage id="page.donation.label.message" />
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form_textarea"
                        />
                    </div>
                    <button
                        type="submit"
                        className="form_button"
                    >
                        <FormattedMessage id="page.donation.button.text" />
                    </button>
                </form>
            </div>
        </MessagesContainer>
    );
};

export default DonationPage;
