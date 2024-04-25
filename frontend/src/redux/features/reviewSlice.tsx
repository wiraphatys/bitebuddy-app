import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReviewItem, ReviewJson } from "../../../interface"
import getReview from "@/libs/getReviews";

type ReviewState = {
    reviewItems: ReviewItem[];
}

const initialState: ReviewState = { reviewItems: []};


    
export const reviewSlice = createSlice ({
    name: "cart",
    initialState,
    reducers: { 
        setInitialReviewItems: (state, action: PayloadAction<ReviewItem[]>) => {
            state.reviewItems = action.payload;
        },
        addReview: (state, action: PayloadAction<ReviewItem>) => {
            state.reviewItems.push(action.payload);
        },
        removeReview: (state, action: PayloadAction<string>) => {
            state.reviewItems = state.reviewItems.filter(obj => obj._id !== action.payload);
        }
    }
})

export const { addReview, removeReview, setInitialReviewItems } = reviewSlice.actions
export default reviewSlice.reducer