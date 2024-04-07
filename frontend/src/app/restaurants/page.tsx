import RestaurantSlider from "@/components/RestaurantSlider";
import getRestaurants from "@/libs/getRestaurants";
import styles from './page.module.css'

export default async function RestaurantsPage () {
    const restaurants = await getRestaurants();
    return (
        <div className={styles.page}>
            <h1>Restaurant</h1>
            <RestaurantSlider restaurantsJson={restaurants}/>
        </div>
    );
}