import RestaurantUpdate from "@/components/RestaurantUpdate";
import styles from '../../owner/ownerpage.module.css'
import Link from "next/link";

export default async function update({params}:{params:{rid:string}}) {
    return (
        <div className={styles.page}>
            <h1><Link href={'/restaurants/owner'} className={styles.link}>Restaurant</Link> {'>'} Edit</h1>
            <RestaurantUpdate rid={params.rid}/>
        </div>
    );
}