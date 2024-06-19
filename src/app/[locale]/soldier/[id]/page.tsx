import SoldierComponent from "@/components/soldier/Soldier";
import {getIntl} from "@/lib/intl";

type SoldierPageProps = {
    params: { locale: string, id: string };
};

export default async function SoldierPage({params: {locale, id}}: SoldierPageProps) {
    const intl = await getIntl(locale);
    return (
        <div className="flex flex-column items-center h-100 bg-gray-100 w-100 overflow-auto">
            <SoldierComponent id={id} stories_title={intl.formatMessage({ id: "page.soldier.stories.titles" })} candle_title={intl.formatMessage({ id: "page.candle.headline" })} />
        </div>
        );
}
