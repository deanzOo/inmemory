'use client';
import React, { useState } from 'react';
import AppLink from "@/components/common/AppLink";
import {i18n} from "@/i18n-config";
import {FormattedMessage} from "react-intl";
import MessagesContainer from "@/components/common/MessagesContainer";
import './SearchBar.css'

interface SearchBarProps {
    width: string;
    apiEndpoint: string; // The API endpoint to send search requests
    locale: string; // The current locale
}

const SearchBar: React.FC<SearchBarProps> = ({ width, apiEndpoint, locale }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setResults([]);
            return;
        }

        try {
            const response = await fetch(`${apiEndpoint}?query=${value}`, {
                headers: {
                    'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data.users);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setResults([]);
        }
    };

    const { defaultLocale } = i18n;
    const base_href = locale === defaultLocale ? `/${locale}/soldier/` : `/soldier/`;
    return (

        <MessagesContainer locale={locale}>
            <div style={{ width: width }}>
                    <span className="link searchPlaceholder">
                        <FormattedMessage id="search.placeholder" />
                    </span>
                <label htmlFor="search" className="sr-only">
                </label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    style={{ width: width, padding: '8px' }}
                    className="searchInput"
                />
                <ul className="resultBox">
                    {results.map((result, index) => (
                        <li key={index}>
                            <AppLink locale={locale} href={`${base_href}${result._id}`}>
                                {result.name}
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </div>
        </MessagesContainer>
    );
};

export default SearchBar;
