'use client';

import { useState } from 'react';
import './Login.css'
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";

export default function LoginPage({params: {locale}}: {params: {locale: string}}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.API_SECRET || ''
            },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            alert('Login successful!');
            window.location.href = '/';  // Redirect to home or dashboard
        } else {
            alert('Login failed.');
        }
    };

    return (
        <div className="loginContainer">
            <MessagesContainer locale={locale}>
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6">
                        <FormattedMessage id="page.login.login.label" />
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                <FormattedMessage id="page.login.username.label" />
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                <FormattedMessage id="page.login.password.label" />
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            <FormattedMessage id="page.login.login.label" />
                        </button>
                    </form>
                </div>
            </MessagesContainer>
        </div>
    );
}
