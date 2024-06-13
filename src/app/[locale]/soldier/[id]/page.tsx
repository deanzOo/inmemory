'use client';
import {Soldier} from "@/lib/types";

import {useEffect, useState} from "react";

type SoldierPageProps = {
    params: { locale: string, id: string };
};

export default function SoldierPage({params: {locale, id}}: SoldierPageProps) {
    const [soldier, setSoldier] = useState<Soldier | null>(null);

    useEffect(() => {
        async function fetchSoldier() {
            const response = await fetch('/api/soldiers/' + id);
            const data = await response.json();
            setSoldier(data.soldiers[0]);
        }
        fetchSoldier();
    }, []);

    return (
        <div>
           Hi, I'm {soldier?._id}!
        </div>
    );
}
