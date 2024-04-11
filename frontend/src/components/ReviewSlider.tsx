'use client'
import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewItem, ReviewJson } from "../../interface";
import ReviewCard from "./ReviewCard";
import styles from './reviewcard.module.css'
import getReviews from "@/libs/getReviews";

export default function ReviewSlider({rid}: {rid: string}) {
    const [reviews, setReviews] = useState<ReviewItem[]>();

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const reviewData = await getReviews(rid);
                console.log(reviewData);
                setReviews(reviewData.data);
            } catch (error) {
                console.error('Error fetching review data:', error);
            }
        };

        fetchReview();
    }, [rid]);
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  return (
    <div>
    {
        (reviews && reviews?.length > 0) ? 
      <Slider {...settings}>
      {
        reviews?.map((reviewItem: ReviewItem) => (
          <div key={reviewItem._id}>
            <ReviewCard name={reviewItem.user.email} img={reviewItem.user.img} comment={reviewItem.comment} rating={reviewItem.rating}/>
          </div>
        ))
      }
      </Slider> : ''
    }
    </div>
  );
}