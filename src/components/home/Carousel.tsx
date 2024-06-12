'use client';
import { SetStateAction, useState} from "react";
import {Carousel} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

export default function BootstrapCarousel() {
    const bootstrap = [
        { "id": 1, "type": "image", "src": "https://static.wixstatic.com/media/ea2fc8_fcd189bc780f4011868ce0bc3c3a0d59~mv2.jpg/v1/fill/w_480,h_480,al_c,lg_1,q_80,enc_auto/___________%20(14).jpg", "alt": "ארנון זמורה", "priority": true },
        { "id": 2, "type": "image", "src": "https://static.wixstatic.com/media/352c83_7ce6f93a2bcb4368bd1be3f767f1e7b4~mv2.jpg/v1/fill/w_480,h_480,al_c,lg_1,q_80,enc_auto/____________________.jpg", "alt": "זייד מזאריב", "priority": true },
        { "id": 3, "type": "image", "src": "https://static.wixstatic.com/media/ea2fc8_6c9144718c7049c3b46faad539238ab2~mv2.jpeg/v1/fill/w_590,h_590,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/whatsapp-image-2024-06-06-at-00-44-53.jpeg", "alt": "רפאל קאודרס", "priority": true }
    ];
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: SetStateAction<number>, e: any) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className="h-max">
            {bootstrap.map((item) => (
                <Carousel.Item key={item.id} interval={4000}>
                    {
                        item.type === "image" ?
                            <Image src={item.src} alt={item.alt} width={250} height={250} priority={item.priority} />
                            :
                            <video controls width={450}>
                                <source src={item.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                    }
                    <Carousel.Caption>
                        <p>{item.alt}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
