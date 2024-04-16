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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
                  setRestaurant(undefined);
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
          src={restaurant.img}
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
      </div> : <a href="/restaurants/owner/create"><button className={styles.createButton}><AddCircleOutlineIcon/> Create Your Restaurant</button></a>
      }
    </div>
  );
}
