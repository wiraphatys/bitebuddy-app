'use client'
import MenuSlider from "@/components/MenuSlider";
import getMenu from "@/libs/getMenus";
import getRestaurant from "@/libs/getRestaurant";
import styles from './page.module.css'

export default async function RestaurantPage({params}: {params : {rid: string}}) {
    // const menus = await getMenu(params.rid)
    const restaurant = getRestaurant(params.rid)

    return (
        <div className={styles.page}>
            <h1>Restaurant</h1>
        </div>
    );
}