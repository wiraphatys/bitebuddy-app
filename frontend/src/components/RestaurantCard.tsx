'use client'
import Image from "next/image";
import styles from './restaurantcard.module.css'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function RestaurantCard({name, img, open, close, avgRating, id}: {name: string, img: string, open: string, close: string, avgRating: string|number, id: string}) {
    console.log(img)
    return (
        <Link href={`/restaurants/${id}`}>
         <div className={styles.card}>
            <Image src={img} alt='icon' layout='fill' objectFit="cover"/>
            <div className={styles.cardtext}>
                <div className={styles.text}>
                <h1>{name}</h1>
                <p><FontAwesomeIcon icon={faClock}/> {open} - {close}</p>
                </div>
                <div className={styles.ratingbox}>
                    <div className="pl-3">{typeof avgRating === 'number' ? avgRating.toFixed(1) : avgRating} &#9733;</div>
                </div>
            </div>
        </div>
        </Link>
    );
}