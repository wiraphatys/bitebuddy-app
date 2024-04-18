'use client'

import Image from "next/image";
import styles from "./menucard.module.css"

export default function MenuCard({name, img, description} : {name: string, img: string, description: string}) {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                {/* <Image src="/img/logo.png" alt='icon' layout='fill' objectFit="contain"/> */}
            </div>
            <div className={styles.text}>
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