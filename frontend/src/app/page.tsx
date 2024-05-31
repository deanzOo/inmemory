import MediaCarousel from "@/app/components/Carousel";
import RSSFeed from "@/app/components/RSSFeed";

export default function Home() {
    return (
        <div id="content" className="w-4/5 p-5 flex flex-col flex-grow justify-between items-center">
            <h1 className="text-2xl font-bold mb-4 text-center">ברוכים הבאים לאתר הנצחה</h1>
            <div id="search_bar" className="mb-4">
                <input type="text" placeholder="חיפוש נופל" className="w-full p-2 border border-gray-300 rounded"/>
            </div>
            <MediaCarousel/>
            <RSSFeed/>
        </div>
    );
}
