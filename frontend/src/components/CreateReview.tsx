"use client";
import { Rating } from "@mui/material";
import React, { FormEvent, useState } from "react";
import styles from "./createreview.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import config from "@/utils/config";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function CreateReview({
  rid,
  setCreate,
  fetchReviews
}: {
  rid: string;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  fetchReviews: () => {};
}) {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (rating && comment) {
        const payload = {
            rating: rating,
            comment: comment,
        }
        const response = await axios.post(
          `${config.api}/restaurants/${rid}/reviews`,
          payload,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://se-api-test.vercel.app/",
            },
          }
        );
        if (response.data.success === true) {
          setCreate(false);
          fetchReviews();
          Swal.fire({
            title: "Create Review",
            text: "this review has been created.",
            icon: "success",
            timer: 2000,
          });
        } else {
          throw new Error(response.data.message);
        }
      } else {
        throw new Error("Please try again");
      }
    } catch (error: any) {
      console.log(error.response);
      Swal.fire({
        title: "Failed to make review",
        text: "You already made a review of this restaurant",
        icon: "error",
        timer: 2000,
      });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.create}>
        <div className={styles.container}>
          <div>
            <h1>Review</h1>
            <button
              onClick={() => {
                setCreate(false);
              }}
            >
              <HighlightOffIcon />
            </button>
          </div>
          <div>
            <Rating
              name="simple-controlled"
              value={rating}
              style={{ color: "#333333" }}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <input
            type="text"
            value={comment ? comment : ""}
            maxLength={100}
            placeholder="Comment (Limit 100 letters)"
            className={styles.input}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={handleSubmit}>Done</button>
        </div>
      </div>
    </div>
  );
}