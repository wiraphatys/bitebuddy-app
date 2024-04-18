'use client'

import Image from "next/image";
import styles from "./menu.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import config from "@/utils/config";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeMenu } from "@/redux/features/menuSlice";
import { MenuItem } from "../../interface";

export default function Menu({name, img, description, mid, rid} : {name: string, img: string, description: string, mid: string, rid:string}) {
    const router = useRouter();
    const [role, setRole] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() =>{
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('role') === "owner" || !localStorage.getItem('role')){
              setRole('owner')
            }
        }
    })

    const handleMenuDelete = async()=>{
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

                const response = await axios.delete(`${config.api}/menus/${mid}`, config.headers());
  
                if (response.data.success) {
                    dispatch(removeMenu(mid));

                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Restaurant has been deleted successfully.',
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
                    text: error.message || 'An error occurred while deleting the restaurant.',
                    icon: 'error',
                    timer: 2000
                });
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image src={img} alt='icon' layout='fill' objectFit="contain"/>
                {
                role === 'owner'?
                <button className={styles.circle} onClick={handleMenuDelete}><DeleteOutlineIcon/></button>:null
                }  
            </div> 
            <div className={styles.text}>
                <h1>
                    {name}
                </h1>
                <p>
                    {description}
                </p>
            </div>
        </div>
    );
}