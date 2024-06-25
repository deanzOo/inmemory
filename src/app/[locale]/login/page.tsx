'use client';

import { useState } from 'react';
import './Login.css'
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";

export default function LoginPage({params: {locale}}: {params: {locale: string}}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            window.location.href = '/';  // Redirect to home or dashboard
        } else {
            setError('כישלון. ' + (await res.json()).error || 'שגיאה לא ידועה');
        }
    };

    return (
        <MessagesContainer locale={locale}>
            <div className="loginPage">
                    <div className="loginContainer">
                        <h1 className="loginHeader">
                            <FormattedMessage id="page.login.login.label" />
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="loginInputContainer">
                                <label className="loginInputHeader">
                                    <FormattedMessage id="page.login.username.label" />
                                </label>
                                <input
                                    type="text"
                                    className="loginInput"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="loginInputContainer">
                                <label className="loginInputHeader">
                                    <FormattedMessage id="page.login.password.label" />
                                </label>
                                <input
                                    type="password"
                                    className="loginInput"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="loginButton">
                                <FormattedMessage id="page.login.login.label" />
                            </button>
                        </form>
                    </div>
            </div>
        </MessagesContainer>
    );
}
