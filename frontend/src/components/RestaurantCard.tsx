import Image from "next/image";
import styles from './restaurantcard.module.css'

export default function RestaurantCard({/*{name, img, open, close, date, avgRating}: {name: string, img: string, open: string, close: string, date: string, avgRating: number}*/}) {


    return (
        <div className={styles.card}>
            <Image src="/img/logo.png" alt='icon' layout='fill' objectFit="contain"/>
            <div className={styles.cardtext}>
                {/* <h1>{name}</h1> */} <h1>name</h1>
                {/* <p>&#xf017; {open} - {close}</p> */} <p>&#xF293; time</p>
                <div>
                    {/* {avgRating} &#9733;  */} rating
                </div>
            </div>
        </div>
    );
}