'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";
import './addSoldier.css';

interface FormData {
    name: string;
    rank: string;
    unit: string;
    dateOfDeath: string;
    image: string;
}

type AddSoldierProps = {
    params: { locale: string };
};

export default function AddSoldier({ params: { locale } }: AddSoldierProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        rank: '',
        unit: '',
        dateOfDeath: '',
        image: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch(`api/addSoldier`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            setMessage('Soldier added successfully! חייל נוסף בהצלחה!');
            setFormData({
                name: '',
                rank: '',
                unit: '',
                dateOfDeath: '',
                image: '',
            });
        } else {
            const error = await response.json();
            setMessage(`שגיאה: ${error.message}`);
        }
    };

    return (
        <MessagesContainer locale={locale}>
            <div className="addSoldierContainer">
                    <FormattedMessage tagName="h1" id="page.addSoldier.title" />
                <div className="formContainer">
                    <span>{message}</span>
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <label htmlFor="name">
                                <FormattedMessage id="page.addSoldier.name" />:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="rank">
                                <FormattedMessage id="page.addSoldier.rank" />:
                            </label>
                            <input
                                type="text"
                                name="rank"
                                id="rank"
                                value={formData.rank}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="unit">
                                <FormattedMessage id="page.addSoldier.unit" />:
                            </label>
                            <input
                                type="text"
                                name="unit"
                                id="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="dateOfDeath">
                                <FormattedMessage id="page.addSoldier.deathdate" />:
                            </label>
                            <input
                                type="date"
                                name="dateOfDeath"
                                id="dateOfDeath"
                                value={formData.dateOfDeath}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="image">
                                <FormattedMessage id="page.addSoldier.image" />:
                            </label>
                            <input
                                type="text"
                                name="image"
                                id="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="inputContainer_button" type="submit">
                            <FormattedMessage id="page.addSoldier.button.add" />
                        </button>
                    </form>
                </div>
            </div>
        </MessagesContainer>
    );
}
