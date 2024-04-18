import MenuSlider from "@/components/MenuSlider";
import getMenu from "@/libs/getMenus";
import getRestaurant from "@/libs/getRestaurant";
import styles from './page.module.css'
import RestaurantDetail from "@/components/RestaurantDetail";
import OverallRating from "@/components/OverallRating";
import Link from "next/link";
import ReviewSlider from "@/components/ReviewSlider";

export default async function RestaurantPage({params}: {params : {rid: string}}) {

    return (
        <div className={styles.page}>
            <h1><Link href={'/restaurants'} className={styles.link}>Restaurant</Link> {'>'} Detail</h1>
            <RestaurantDetail rid={params.rid}/>
            <MenuSlider rid={params.rid}/>
            <h1 className="text-5xl">Rate</h1>
            <div className={styles.center}>
                <OverallRating rid={params.rid}/>
            </div>
            <ReviewSlider rid={params.rid}/>
        </div>
    );
}