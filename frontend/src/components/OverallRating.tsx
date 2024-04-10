'use client'
import { Rating } from "@mui/material";
import styles from "./overallrating.module.css"
import getReviews from "@/libs/getReviews";
import { useEffect, useState } from "react";
import getRestaurant from "@/libs/getRestaurant";
import { RestaurantItem, ReviewItem } from "../../interface";

export default function OverallRating ({rid}: {rid:string}) {
    const [restaurant, setRestaurant] = useState<RestaurantItem>();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const restaurantData = await getRestaurant(rid);
                console.log(restaurantData);
                setRestaurant(restaurantData.data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        };

        fetchRestaurant();
    }, [rid]);

    const [reviews, setReviews] = useState<ReviewItem[]>();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData = await getReviews(rid);
                console.log(reviewsData);
                setReviews(reviewsData.data);
            } catch (error) {
                console.error('Error fetching reviews data:', error);
            }
        };

        fetchReviews();
    }, [rid]);

    return (
        <div className={styles.overallContainer}>
            <h2>Reviews and Ratings</h2>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col justify-center items-center">
                    <h3>Overall Rating & Reviews</h3>
                    <h1>{restaurant?.averageRating.toFixed(1)}</h1>
                    <Rating name="read-only" value={restaurant?.averageRating} precision={0.1} readOnly />
                    <h3>Based on {reviews?.length == null ? 0 : reviews.length} reviews</h3>
                </div>
                <div className={styles.rating}>
                    <div><Rating value={5} readOnly /><div className={styles.line}><div className={styles.colorline} style={{width: `${10}%`}}/></div></div>
                    <div><Rating value={4} readOnly /><div className={styles.line}><div className={styles.colorline} style={{width: `${20}%`}}/></div></div>
                    <div><Rating value={3} readOnly /><div className={styles.line}><div className={styles.colorline} style={{width: `${30}%`}}/></div></div>
                    <div><Rating value={2} readOnly /><div className={styles.line}><div className={styles.colorline} style={{width: `${20}%`}}/></div></div>
                    <div><Rating value={1} readOnly /><div className={styles.line}><div className={styles.colorline} style={{width: `${20}%`}}/></div></div>
                </div>
            </div>
            <div className={styles.center}>
                <button>
                    Rate now
                </button>
            </div>
        </div>
    );
}