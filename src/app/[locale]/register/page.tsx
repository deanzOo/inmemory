'use client';

import { useState } from 'react';
import {router} from "next/client";
import MessagesContainer from "@/components/common/MessagesContainer";
import './Register.css'
import {FormattedMessage} from "react-intl";

export default function RegisterPage({params: {locale}}: {params: {locale: string}}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            alert('Registration successful!');
            await router.push('/login');
        } else {
            alert('Registration failed: ' + (await res.json()).error || 'Unknown error');
        }
    };

    return (
        <div className="registerPage">
            <MessagesContainer locale={locale}>
                <div className="registerContainer">
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
