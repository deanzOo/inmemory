'use client';
import { SetStateAction, useState} from "react";
import info from "../../../public/info.json";
import {Carousel} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

export default function BootstrapCarousel() {
    const {bootstrap} = info.items;
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
