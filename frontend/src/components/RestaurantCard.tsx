'use client'
import Image from "next/image";
import styles from './restaurantcard.module.css'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function RestaurantCard({name, img, open, close, avgRating, id}: {name: string, img: string, open: string, close: string, avgRating: number, id: string}) {
    if(avgRating == null){
        avgRating = 0.0;
    }
    console.log(img)
    return (
        <Link href={`/restaurants/${id}`}>
         <div className={styles.card}>
            <Image src='https://bitebuddycloud.s3.ap-southeast-1.amazonaws.com/39517f157d1b02bd08ea0b589cf46d83bb5a3a2828a043bb4e4df6a3e3c3c177?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GDXBI3R753ZLH6%2F20240407%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240407T095316Z&X-Amz-Expires=900&X-Amz-Signature=76122dc02e91a55764ec0f0d35d60e91a1d65789ae63dad3a9590dadf27a1c62&X-Amz-SignedHeaders=host&x-id=GetObject' alt='icon' layout='fill' objectFit="contain"/>
            <div className={styles.cardtext}>
                <div className={styles.text}>
                <h1>{name}</h1>
                <p><FontAwesomeIcon icon={faClock}/> {open} - {close}</p>
                </div>
                <div className={styles.ratingbox}>
                    <div className="pl-3">{avgRating.toFixed(1)} &#9733;</div>
                </div>
            </div>
        </div>
        </Link>
    );
}