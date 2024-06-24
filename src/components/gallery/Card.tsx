'use client';

import {Soldier} from "@/lib/types";
import AppLink from "@/components/common/AppLink";
import {i18n} from "@/i18n-config";
import {formatDate} from "@/lib/helpers";
import Image from "next/image";
import './Card.css';

export default function Card({locale, soldier, key}: {locale: string, soldier: Soldier, key: number}) {


    const { defaultLocale } = i18n;

    const href = locale === defaultLocale ? `/${locale}/soldier/${soldier._id}` : `/soldier/${soldier._id}`;

    return (
        <AppLink locale={locale} href={href}>
            <div key={key} className="card_container">
                <div className="card_info">
                    <h2 className="card_info_data card_info_name">{soldier.name}</h2>
                    <p className="card_info_data">{soldier.rank}</p>
                    <p className="card_info_data">{soldier.unit}</p>
                    <p className="card_info_data">{formatDate(soldier.dateOfDeath)}</p>
                </div>
                <Image width={325} height={325} src={soldier.image} alt={soldier.name} />
            </div>
        </AppLink>
    );
}
