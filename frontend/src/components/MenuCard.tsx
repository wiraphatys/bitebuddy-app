'use client'

import Image from "next/image";

export default function MenuCard({name, img, description} : {name: string, img: string, description: string}) {
    return (
        <div>
            <div>
                <Image src="/img/logo.png" alt='icon' layout='fill' objectFit="contain"/>
            </div>
            <div>
                <h1>
                    {name}
                </h1>
                <p>
                    {description}
                </p>
            </div>
        </div>
    );
}