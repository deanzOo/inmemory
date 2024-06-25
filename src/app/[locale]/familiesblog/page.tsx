import Blog from "@/components/stories/Blog";
import {getIntl} from "@/lib/intl";

const FamiliesBlog = async ({params: {locale}}: {params: { locale: string }}) => {
    const intl = await getIntl(locale);
    return <Blog title={intl.formatMessage({ id: "page.familiesblog.header" })} family={true} locale={locale} />;
};

export default FamiliesBlog;
