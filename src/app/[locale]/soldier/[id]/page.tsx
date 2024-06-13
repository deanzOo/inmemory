'use client';

import SoldierComponent from "@/components/soldier/Soldier";

type SoldierPageProps = {
    params: { locale: string, id: string };
};

export default function SoldierPage({params: {locale, id}}: SoldierPageProps) {
    return <SoldierComponent id={id} />;
}
