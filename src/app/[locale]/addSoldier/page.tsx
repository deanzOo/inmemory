'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";

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
            alert('Soldier added successfully!');
            setFormData({
                name: '',
                rank: '',
                unit: '',
                dateOfDeath: '',
                image: '',
            });
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-column items-center pt-10 min-h-screen bg-gray-100 w-100">
            <MessagesContainer locale={locale}>
                <FormattedMessage tagName="h1" id="page.addSoldier.title" />
            </MessagesContainer>
            <div className="mt-20">
                <MessagesContainer locale={locale}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                <FormattedMessage id="page.addSoldier.name" />:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rank">
                                <FormattedMessage id="page.addSoldier.rank" />:
                            </label>
                            <input
                                type="text"
                                name="rank"
                                id="rank"
                                value={formData.rank}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
                                <FormattedMessage id="page.addSoldier.unit" />:
                            </label>
                            <input
                                type="text"
                                name="unit"
                                id="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfDeath">
                                <FormattedMessage id="page.addSoldier.deathdate" />:
                            </label>
                            <input
                                type="date"
                                name="dateOfDeath"
                                id="dateOfDeath"
                                value={formData.dateOfDeath}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                <FormattedMessage id="page.addSoldier.image" />:
                            </label>
                            <input
                                type="text"
                                name="image"
                                id="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            <FormattedMessage id="page.addSoldier.button.add" />
                        </button>
                    </form>
                </MessagesContainer>
            </div>
        </div>
    );
}
