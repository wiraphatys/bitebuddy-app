'use client'

import { Rating } from "@mui/material";
import Image from "next/image";
import styles from "./reviewcard.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import Swal from "sweetalert2";
import config from "@/utils/config";
import { removeReview } from "@/redux/features/reviewSlice";
import getUser from "@/libs/getUser";
import { UserItem } from "../../interface";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ReviewUpdate from "./ReviewUpdate";

export default function ReviewCard({name, img, comment, rating, rid} : {name: string, img: string, comment: string, rating:number, rid:string}) {

    const [role, setRole] = useState<string>();
    const [user, setUser] = useState<UserItem>();
    const [create, setCreate] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() =>{
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('role') === "owner" || !localStorage.getItem('role')){
              setRole('owner')
            }else if(localStorage.getItem('role') == 'admin'){
                setRole('admin')
            }else{
                setRole('user')
            }
        }
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                console.log(userData);
                setUser(userData.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, []);

    const handleReviewDelete = async()=>{
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete',
            showCancelButton: true,
            cancelButtonColor: 'black',
            confirmButtonColor: 'rgba(0,0,0,0.60)',
            confirmButtonText: 'Cancel',
            cancelButtonText: 'Delete',
            background: "#f0f0f0",
            customClass: {
              confirmButton: `${styles.button}`,
              cancelButton: `${styles.button}`
            }
        });
  
        // If user confirms the deletion
        if (!confirmation.isConfirmed) {
            try {

                const response = await axios.delete(`${config.api}/reviews/${rid}`, config.headers());
  
                if (response.data.success) {
                    dispatch(removeReview(rid));

                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Review has been deleted successfully.',
                        icon: 'success',
                        timer: 2000
                    });
                    // Perform any additional actions after successful deletion
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error: any) {
                Swal.fire({
                    title: 'Error',
                    text: error.message || 'An error occurred while deleting the Review.',
                    icon: 'error',
                    timer: 2000
                });
            }
        }
    };

    return (
        <div className={styles.container}>
            { create ? 
            <div>
            {
                ( role == 'admin' || user?.email == name )?
                <button className={styles.delete} onClick={handleReviewDelete}><DeleteOutlineIcon/></button>:null
            }  
            {
                ( role == 'admin' || user?.email == name )?
                <button className={styles.update} onClick={() => setCreate(true)}><MoreHorizIcon/></button>:null
            }
            <div className={styles.circle}>
                <img src={img ? img : '/img/userAnonymous.png'} className="w-full h-full rounded-full"/>
            </div>
                <h1 className={styles.nameText}>
                    {name}
                </h1>
                <p className={styles.descriptionText}>
                    {comment}
                </p>
                <div className={styles.rating}>{rating.toFixed(1)} <Rating value={parseFloat(rating.toFixed(1))} readOnly style={{ color: 'black' }}/></div>
                </div>
                : <ReviewUpdate rid={rid} rate={rating} des={comment} setCreate={setCreate} />
            }
        </div>
    );
}