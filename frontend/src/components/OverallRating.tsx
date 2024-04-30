'use client'
import { Rating } from "@mui/material";
import styles from "./overallrating.module.css"
import getReviews from "@/libs/getReviews";
import { useEffect, useState } from "react";
import getRestaurant from "@/libs/getRestaurant";
import { RestaurantItem, ReviewItem } from "../../interface";
import getRestaurants from "@/libs/getRestaurants";
import CreateReview from "./CreateReview";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setInitialReviewItems } from "@/redux/features/reviewSlice";
import Loading from "./Loading";

export default function OverallRating ({rid}: {rid:string}) {
    const [loading, setLoading] = useState<boolean>(true)
    const [restaurant, setRestaurant] = useState<RestaurantItem>();
    const dispatch = useDispatch<AppDispatch>();
    const reviewItems = useAppSelector((state) => state.reviewSlice.reviewItems);
    const [role, setRole] = useState('');
    const [rate5, setRate5] = useState<number>(0);
    const [rate4, setRate4] = useState<number>(0);
    const [rate3, setRate3] = useState<number>(0);
    const [rate2, setRate2] = useState<number>(0);
    const [rate1, setRate1] = useState<number>(0);
    const [total, setTotal] = useState(0);
    const [create, setCreate] = useState(false);

    useEffect(() => {

        const fetchRestaurant = async () => {
            try {
                let restaurantData
                if(localStorage.getItem('role') === 'owner'){
                    setRole('owner');
                    restaurantData = await getRestaurants();
                }else {
                    restaurantData = await getRestaurant(rid);
                }
                console.log(restaurantData);
                setRestaurant(restaurantData.data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            } finally {
                setLoading(false)
            }
        };
        
        fetchReviews();
        fetchRestaurant();
    }, [reviewItems]);

    const fetchReviews = async () => {
        try {
            if (reviewItems) {
                let count5 = 0;
                let count4 = 0;
                let count3 = 0;
                let count2 = 0;
                let count1 = 0;
        
                reviewItems.forEach((review) => {
                    if (review.rating === 5) {
                        count5++;
                    } else if (review.rating === 4) {
                        count4++;
                    } else if (review.rating === 3) {
                        count3++;
                    } else if (review.rating === 2) {
                        count2++;
                    } else {
                        count1++;
                    }
                });
        
                setRate5(count5);
                setRate4(count4);
                setRate3(count3);
                setRate2(count2);
                setRate1(count1);
                setTotal(reviewItems.length);
            }
        } catch (error) {
            console.error('Error fetching reviews data:', error);
        }
    };



    return (
        <>
            {
                loading ? (<Loading />) : (
                    <>
                        <div>
                            {
                                create ? <CreateReview rid={rid} setCreate={setCreate} fetchReviews={fetchReviews} /> : null
                            }
                            {
                                restaurant ?
                                    <div className={styles.overallContainer}>
                                        <h2>Reviews and Ratings</h2>
                                        <div className="flex flex-row justify-evenly">
                                            <div className="flex flex-col justify-center items-center">
                                                <h3>Overall Rating & Reviews</h3>
                                                <h1>{typeof restaurant?.averageRating === 'number' ? restaurant.averageRating.toFixed(1) : parseFloat(restaurant.averageRating).toFixed(1)}</h1>
                                                <Rating name="read-only" value={typeof restaurant?.averageRating === 'number' ? parseFloat(restaurant.averageRating.toFixed(1)) : parseFloat(restaurant.averageRating)} precision={0.1} readOnly />
                                                <h3>Based on {reviewItems?.length == null ? 0 : reviewItems.length} reviews</h3>
                                            </div>
                                            <div className={styles.rating}>
                                                <div><Rating value={5} readOnly style={{ color: 'black' }} /><div className={styles.line}><div className={styles.colorline} style={{ width: `${rate5 * 100 / (total === 0 ? 1 : total)}%` }} /></div><div className="ml-2">{rate5}</div></div>
                                                <div><Rating value={4} readOnly style={{ color: 'black' }} /><div className={styles.line}><div className={styles.colorline} style={{ width: `${rate4 * 100 / (total === 0 ? 1 : total)}%` }} /></div><div className="ml-2">{rate4}</div></div>
                                                <div><Rating value={3} readOnly style={{ color: 'black' }} /><div className={styles.line}><div className={styles.colorline} style={{ width: `${rate3 * 100 / (total === 0 ? 1 : total)}%` }} /></div><div className="ml-2">{rate3}</div></div>
                                                <div><Rating value={2} readOnly style={{ color: 'black' }} /><div className={styles.line}><div className={styles.colorline} style={{ width: `${rate2 * 100 / (total === 0 ? 1 : total)}%` }} /></div><div className="ml-2">{rate2}</div></div>
                                                <div><Rating value={1} readOnly style={{ color: 'black' }} /><div className={styles.line}><div className={styles.colorline} style={{ width: `${rate1 * 100 / (total === 0 ? 1 : total)}%` }} /></div><div className="ml-2">{rate1}</div></div>
                                            </div>
                                        </div>
                                        {
                                            role !== 'owner' ? <div className={styles.center}>
                                                <button onClick={() => setCreate(true)}>
                                                    Rate now
                                                </button>
                                            </div> : null
                                        }
                                    </div> : null
                            }
                        </div>
                    </>
                )
            }
        </>
    );
}