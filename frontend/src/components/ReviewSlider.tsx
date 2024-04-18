'use client'
import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewItem, ReviewJson } from "../../interface";
import ReviewCard from "./ReviewCard";
import styles from './reviewcard.module.css'
import getReviews from "@/libs/getReviews";

export default function ReviewSlider({rid}: {rid?: string}) {
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
    className: "center",
    dots: true,
    infinite: reviews && reviews?.length >= 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: false,
    nextArrow: (
      <div>
        <div className="next-slick-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
        </div>
      </div>
    ),

    prevArrow: (
      <div>
        <div className="next-slick-arrow rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
        </div>
      </div>
    ),
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