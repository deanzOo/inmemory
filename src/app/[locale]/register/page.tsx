'use client';

import React, { useState } from 'react';
import {useRouter} from "next/navigation";
import MessagesContainer from "@/components/common/MessagesContainer";
import './Register.css'
import {FormattedMessage} from "react-intl";

export default function RegisterPage({params: {locale}}: {params: {locale: string}}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            // try to automatically login
            const loginRes = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                },
                body: JSON.stringify({ username, password })
            });
            if (loginRes.ok) {
                window.location.href = '/';  // Redirect to home or dashboard
            } else {
                push('/login');
            }
        } else {
            setError('משתמש תפוס ' + (await res.json()).error || 'שגיאה לא ידועה');
        }
    };

    return (
        <div className="registerPage">
            <MessagesContainer locale={locale}>
                <div className="registerContainer">
                    {error}
                    <h1 className="registerHeader">
                        <FormattedMessage id="page.register.register.label" />
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="registerInputContainer">
                            <label className="registerInputHeader">
                                <FormattedMessage id="page.register.username.label" />
                            </label>
                            <input
                                type="text"
                                className="registerInput"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="registerInputContainer">
                            <label className="registerInputHeader">
                                <FormattedMessage id="page.register.password.label" />
                            </label>
                            <input
                                type="password"
                                className="registerInput"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="registerButton">
                            <FormattedMessage id="page.register.register.label" />
                        </button>
                    </form>
                </div>
            </MessagesContainer>
        </div>
    );
}
