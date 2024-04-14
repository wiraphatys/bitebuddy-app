"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { RestaurantItem, RestaurantJson } from "../../interface";
import styles from "./restaurantowner.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "@/utils/config";
import getRestaurants from "@/libs/getRestaurants";

export default function RestaurantOwner() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<RestaurantItem>();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('role') !== "owner"){
              router.back();
            }
        }
        const restaurantData = await getRestaurants();
        console.log(restaurantData);
        setRestaurant(restaurantData.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurant();
  }, []);

  const handleRestaurantDelete =async()=>{
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
              const response = await axios.delete(`${config.api}/restaurants/${restaurant?._id}`, config.headers());

              if (response.data.success) {
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
    <div>
    {
      restaurant ? 
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://bitebuddycloud.s3.ap-southeast-1.amazonaws.com/39517f157d1b02bd08ea0b589cf46d83bb5a3a2828a043bb4e4df6a3e3c3c177?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GDXBI3R753ZLH6%2F20240407%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240407T095316Z&X-Amz-Expires=900&X-Amz-Signature=76122dc02e91a55764ec0f0d35d60e91a1d65789ae63dad3a9590dadf27a1c62&X-Amz-SignedHeaders=host&x-id=GetObject"
          alt="icon"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div>
        <div className={styles.nameContainer}>
          <div className={styles.nameText}>
            <h1>{restaurant?.name}</h1>
          </div>
          <h3>Description</h3>
          <div className={styles.description}>{restaurant?.description}</div>
        </div>
        <div className={styles.belowContainer}>
          <div className={styles.addressContainer}>
            <div className={styles.address}>
              <div>
                <div><h1>Street :&ensp;</h1> <div>{restaurant?.street}</div></div>
                <div><h1>District :&ensp;</h1> <div>{restaurant?.district}</div></div>
                <div><h1>Zip Code :&ensp;</h1> <div>{restaurant?.zipcode}</div></div>
              </div>
              <div>
                <div><h1>Locality :&ensp;</h1> <div>{restaurant?.locality}</div></div>
                <div><h1>Province :&ensp;</h1> <div>{restaurant?.province}</div></div>
                <div><h1>Telephone :&ensp;</h1> <div>{restaurant?.tel}</div></div>
              </div>
            </div>
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.time}>
              <h1>Open - Close Time</h1>
              <div>
                <div>{restaurant?.open}</div>
                <h2>&ensp;-&ensp;</h2>
                <div>{restaurant?.close}</div>
              </div>
            </div>
            <div className={styles.date}>
              <h1>Opening Date</h1>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <div key={index}>
                    <h2>{day}</h2>
                    <input
                      type="checkbox"
                      checked={!restaurant?.closeDate.includes(index)}
                    />
                  </div>
                )
              )}
            </div>
            <div></div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className="flex flex-row ml-auto">
          <button className={styles.button} onClick={handleRestaurantDelete}>Delete</button>
          <a href={`/restaurants/${restaurant._id}/update`}><button className={styles.button}>Edit</button></a>
          </div>
        </div>
      </div>
      </div> : <a href="/restaurants/owner/create"><button className={styles.createButton}>Create Your Restaurant</button></a>
      }
    </div>
  );
}
