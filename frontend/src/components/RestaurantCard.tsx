import Image from "next/image";
import styles from './restaurantcard.module.css'
import Link from "next/link";

export default function RestaurantCard({name, img, open, close, avgRating, id}: {name: string, img: string, open: string, close: string, avgRating: number, id: string}) {
    if(avgRating == null){
        avgRating = 0.0;
    }

    return (
        <Link href={`/restaurants/${id}`}>
         <div className={styles.card}>
            <Image src="/img/logo.png" alt='icon' layout='fill' objectFit="contain"/>
            <div className={styles.cardtext}>
                <div className={styles.text}>
                <h1>{name}</h1>
                <p>&#xf017; {open} - {close}</p>
                </div>
                <div className={styles.ratingbox}>
                    {avgRating.toFixed(1)} &#9733;
                </div>
            </div>
        </div>
        </Link>
    );
}