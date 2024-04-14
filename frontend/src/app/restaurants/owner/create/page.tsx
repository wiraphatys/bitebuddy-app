import styles from '../../owner/ownerpage.module.css'
import Link from "next/link";
import RestaurantCreate from "@/components/RestaurantCreate";

export default async function update({params}:{params:{rid:string}}) {
    return (
        <div className={styles.page}>
            <h1><Link href={'/restaurants/owner'} className={styles.link}>Restaurant</Link> {'>'} Create</h1>
            <RestaurantCreate rid={params.rid}/>
        </div>
    );
}