import RestaurantOwner from "@/components/RestaurantOwner";
import styles from './ownerpage.module.css'

export default async function OwnerRestaurantPage({params}:{params:{rid:string}}) {
    return(
        <div className={styles.page}>
            <h1>Restaurant</h1>
            <RestaurantOwner/>
        </div>
    );
}