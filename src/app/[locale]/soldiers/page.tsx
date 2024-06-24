'use client';
import { useState, useEffect } from 'react';
import Card from "@/components/gallery/Card";
import {Soldier} from "@/lib/types";
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";
import "./Soldiers.css";

type GalleryParams = {
    params: {
        locale: string;
    };
}

export default function Gallery({params: {locale}}: GalleryParams) {
    const [soldiers, setSoldiers] = useState<Soldier[]>([]);

    useEffect(() => {
        async function fetchSoldiers() {
            const response = await fetch('/api/soldiers', {
                headers: {
                    'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                }
            });
            const data = await response.json();
            setSoldiers(data.soldiers);
        }
        fetchSoldiers();
    }, []);

    return (
        <div className="gallery_container">
            <MessagesContainer locale={locale}>
                <h1 className="gallery_header">
                    <FormattedMessage id="page.gallery.headline" />
                </h1>
            </MessagesContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldiers.map((soldier, index) => (
                    <Card locale={locale} key={index} soldier={soldier} />
                ))}
            </div>
        </div>
    );
}
