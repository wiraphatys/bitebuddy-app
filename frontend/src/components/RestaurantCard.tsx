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
            <Image src={img} alt='icon' layout='fill' objectFit="contain"/>
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