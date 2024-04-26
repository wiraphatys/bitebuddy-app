'use client'
import Image from "next/image";
import styles from "./topmenu.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import { RestaurantItem } from "../../interface";
import getRestaurants from "@/libs/getRestaurants";
import SearchIcon from '@mui/icons-material/Search';
export default function TopMenu() {

    const [role,setRole] = useState<string|undefined>();
    const [restaurant, setRestaurant] = useState<RestaurantItem>();

    useEffect(() =>{
        const fetchRestaurant = async () => {
            try {
              const restaurantData = await getRestaurants();
              console.log(restaurantData);
              setRestaurant(restaurantData.data);
            } catch (error) {
              console.error("Error fetching restaurant data:", error);
            }
        };
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('role') === "owner"){
              fetchRestaurant();
              setRole('owner');
            }else if(localStorage.getItem('role')){
                setRole('user');
            }else{
                setRole(undefined)
            }
        }
    },[])

    return (
        <div className={styles.menucontainer}>
            <div className={styles.containerleft}>
                <Link href='/'>
                    <Image src="/img/logo.png" alt='icon' height={80} width={50}/>
                </Link>
            </div>
            <div className={styles.containerright}>
                {
                role !== 'owner' ? 
                <div>
                <Link href={role ? '/restaurants/' : '/signin'}>
                    <SearchIcon />
                </Link>
                <Link href={role ? '/myreservation/' : '/signin'}>
                    reservation
                </Link>
                <Link  href={role ? '/profile' : '/signin'}>
                    account
                </Link>
                </div> : 
                <div>
                <Link href={`/myreservation/${restaurant?._id}`}>
                    reservation
                </Link>
                <Link href={`/menu/${restaurant?._id}`}>
                    menu
                </Link>
                <Link href={`/review/${restaurant?._id}`}>
                    review
                </Link>
                <Link href={role ? '/profile' : '/signin'}>
                    account
                </Link>
                </div>
                }
            </div>
        </div>
    );
}