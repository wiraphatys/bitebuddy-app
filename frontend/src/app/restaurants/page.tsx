import RestaurantSlider from "@/components/RestaurantSlider";
import getRestaurants from "@/libs/getRestaurants";

export default async function RestaurantsPage () {
    const restaurants = await getRestaurants();
    return (
        <>
            <RestaurantSlider restaurantsJson={restaurants}/>
        </>
    );
}