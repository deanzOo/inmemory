'use client';

import {Soldier} from "@/lib/types";
import AppLink from "@/components/common/AppLink";
import {i18n} from "../../../i18n-config";

export default function Card({locale, soldier, key}: {locale: string, soldier: Soldier, key: number}) {

    function formatDate(date: string) {
        const deathDate = new Date(date);
        const formattedDate = new Intl.DateTimeFormat('en-GB').format(deathDate);
        const [day, month, year] = formattedDate.split('/');
        return `${day}.${month}.${year}`;
    }
    const { defaultLocale } = i18n;

    const href = locale === defaultLocale ? `/${locale}/soldier/${soldier._id}` : `/soldier/${soldier._id}`;

    return (
        <AppLink locale={locale} href={href}>
            <div key={key} className="bg-white shadow-md rounded-md overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 p-4">
                    <h2 className="text-xl font-bold">{soldier.name}</h2>
                    <p className="text-gray-700">{soldier.rank}</p>
                    <p className="text-gray-700">{soldier.unit}</p>
                    <p className="text-gray-700">{formatDate(soldier.dateOfDeath)}</p>
                </div>
                <div className="md:w-1/2">
                    <img src={soldier.image} alt={soldier.name} className="w-full h-full object-cover"/>
                </div>
            </div>
        </AppLink>
    );
}
