'use client'
import getRestaurant from "@/libs/getRestaurant";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RestaurantItem, RestaurantJson } from "../../interface";
import styles from "./restaurantdetail.module.css"
import { useRouter } from "next/navigation";

export default function RestaurantDetail({ rid }: { rid: string }) {
    const [restaurant, setRestaurant] = useState<RestaurantItem>();
    const [role, setRole] = useState<string | null>();
    const router = useRouter();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                if(!localStorage.getItem('role')){
                    router.push('/')
                }
                setRole(localStorage.getItem('role'))
                const restaurantData = await getRestaurant(rid);
                console.log(restaurantData);
                setRestaurant(restaurantData.data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        };

        fetchRestaurant();
    }, [rid]);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src='https://bitebuddycloud.s3.ap-southeast-1.amazonaws.com/39517f157d1b02bd08ea0b589cf46d83bb5a3a2828a043bb4e4df6a3e3c3c177?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GDXBI3R753ZLH6%2F20240407%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240407T095316Z&X-Amz-Expires=900&X-Amz-Signature=76122dc02e91a55764ec0f0d35d60e91a1d65789ae63dad3a9590dadf27a1c62&X-Amz-SignedHeaders=host&x-id=GetObject' alt='icon' layout='fill' objectFit="contain"/>
      </div>
      <div>
        <div className={styles.nameContainer}>
            <div className={styles.nameText}>
                <h1>{restaurant?.name}</h1> <p>Tel : </p><span className="font-normal">&ensp;{restaurant?.tel}</span>{role !== 'owner' ? <button className={styles.button}>Reservation</button> : null}
            </div> 
            <h3>Description</h3>
            <div className={styles.description}>
                {restaurant?.description}
            </div>
        </div>
        <div className={styles.belowContainer}>
          <div className={styles.addressContainer}>
            <h1>Address</h1>
            <div className={styles.address}>
                <div>
                Street : {restaurant?.street}
                <br/>
                Locality : {restaurant?.locality} 
                <br/>
                District : {restaurant?.district} 
                <br/>
                Province : {restaurant?.province} 
                <br/>
                Zip Code : {restaurant?.zipcode}
                </div>
            </div>
          </div>
          <div className={styles.dateContainer}>
            <h1>Open - Close Time</h1>
            <div className={styles.time}>
                <div>{restaurant?.open} AM</div> <h2>-</h2> <div>{restaurant?.close} PM</div>
            </div>
            <h1>Opening Date</h1>
            <div className={styles.date}>
                <div>
                    <h2>Sun</h2>
                    <input type="checkbox" checked={!restaurant?.closeDate.includes(0)}/>
                </div>
                <div>
                    <h2>Mon</h2>
                    <input type="checkbox" checked={!restaurant?.closeDate.includes(1)}/>
                </div>
                <div>
                    <h2>Tue</h2>
                    <input type="checkbox" checked={!restaurant?.closeDate.includes(2)}/>
                </div>
                <div>
                    <h2>Wed</h2>
                    <input type="checkbox" checked={!restaurant?.closeDate.includes(3)}/>
                </div>
                <div>
                    <h2>Thu</h2>
                    <input type="checkbox" checked={!restaurant?.closeDate.includes(4)}/>
                </div>
                <div>
                    <h2>Fri</h2>
                    <input type="checkbox" checked={!restaurant?.closeDate.includes(5)}/>
                </div>
                <div>
                    <h2>Sat</h2>
                    <input type="checkbox" checked={!restaurant?.closeDate.includes(6)}/>
                </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}
