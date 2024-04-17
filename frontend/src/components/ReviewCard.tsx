'use client'

import { Rating } from "@mui/material";
import Image from "next/image";
import styles from "./reviewcard.module.css";

export default function MenuCard({name, img, comment, rating} : {name: string, img: string, comment: string, rating:number}) {
    return (
        <div className={styles.container}>
            <div className={styles.circle}>
                <img src={img} className="w-full h-full"/>
            </div>
                <h1 className={styles.nameText}>
                    {name}
                </h1>
                <p className={styles.descriptionText}>
                    {comment}
                </p>
                <div className={styles.rating}>{rating.toFixed(1)} <Rating value={parseFloat(rating.toFixed(1))} readOnly/></div>
        </div>
    );
}