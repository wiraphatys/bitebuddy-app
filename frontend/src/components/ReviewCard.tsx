'use client'

import { Rating } from "@mui/material";
import Image from "next/image";

export default function MenuCard({name, img, comment, rating} : {name: string, img: string, comment: string, rating:number}) {
    return (
        <div>
            <div>
                <Image src="/img/logo.png" alt='icon' layout='fill' objectFit="contain"/>
            </div>
                <h1 className={styles.nameText}>
                    {name}
                </h1>
                <p className={styles.descriptionText}>
                    {comment}
                </p>
                <div>{rating} <Rating value={rating} readOnly/></div>
            </div>
        </div>

    );
}