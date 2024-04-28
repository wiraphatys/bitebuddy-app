"use client";
import { Rating } from "@mui/material";
import React, { FormEvent, useState } from "react";
import styles from "./reviewcard.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import config from "@/utils/config";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setInitialReviewItems } from "@/redux/features/reviewSlice";

export default function ReviewUpdate({
  rid,
  rate,
  des,
  setCreate,
}: {
  rid: string;
  rate: number,
  des: string,
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [rating, setRating] = useState<number | null>(rate);
  const [comment, setComment] = useState<string>(des);
  const dispatch = useDispatch<AppDispatch>();

  const handleReviewUpdate = async()=>{
    const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to update',
        showCancelButton: true,
        cancelButtonColor: 'black',
        confirmButtonColor: 'rgba(0,0,0,0.60)',
        confirmButtonText: 'Cancel',
        cancelButtonText: 'Update',
        background: "#f0f0f0",
        customClass: {
          confirmButton: `${styles.button}`,
          cancelButton: `${styles.button}`
        }
    });

    // If user confirms the deletion
    if (!confirmation.isConfirmed) {
        try {
            setCreate(false)

            if(rating && comment){
            const payload = {
                rating: rating,
                comment: comment,
            }
            const response = await axios.put(`${config.api}/reviews/${rid}`, payload, config.headers());

            if (response.data.success) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Review has been updated successfully.',
                    icon: 'success',
                    timer: 2000
                });
                // Perform any additional actions after successful deletion
            } else {
                throw new Error(response.data.message);
            }
        }
        } catch (error: any) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'An error occurred while updating the Review.',
                icon: 'error',
                timer: 2000
            });
        }
    }
};

  return (
    <div className={styles.create}>
          <div className={styles.container}>
            <div className="absolute top-12 right-12">
              <button
                onClick={() => {
                  setCreate(false);
                }}
              >
                <HighlightOffIcon />
              </button>
            </div>
            <div className={styles.rating}>
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
              className={styles.descriptionText}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button className="mt-[12px]" onClick={handleReviewUpdate}>Done</button>
          </div>
          </div>
  );
}
