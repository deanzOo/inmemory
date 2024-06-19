import Candle from '@/components/candle/Candle';
import {getIntl} from "@/lib/intl";

export default async function CandlePage({params: {locale}}: {params: { locale: string }}) {
    const intl = await getIntl(locale);
    return (
        <Candle headline={intl.formatMessage({ id: "page.candle.headline" })} />
    );
}
