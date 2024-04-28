"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { RestaurantItem, RestaurantJson } from "../../interface";
import styles from "./restaurantupdate.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "@/utils/config";
import getRestaurants from "@/libs/getRestaurants";

export default function RestaurantUpdate({ rid }: { rid: string }) {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<RestaurantItem>();
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [district, setDistrict] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [tel, setTel] = useState("");
  const [province, setProvince] = useState("");

  const handleCheckboxChange = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('role') !== "owner"){
              router.push(`/restaurants/${rid}`);
            }
        }
        const restaurantData = await getRestaurants();
        console.log(restaurantData);
        setRestaurant(restaurantData.data);
        setOpenTime(restaurantData.data.open || "");
        setCloseTime(restaurantData.data.close || "");
        setSelectedDays(restaurantData.data.closeDate);
        setDescription(restaurantData.data.description || "");
        setStreet(restaurantData.data.street || "");
        setLocality(restaurantData.data.locality || "");
        setDistrict(restaurantData.data.district || "");
        setProvince(restaurantData.data.province || "");
        setZipcode(restaurantData.data.zipcode || "");
        setTel(restaurantData.data.tel || "");
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurant();
  }, [rid]);

  const handleOpenTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpenTime(event.target.value);
  };

  const handleCloseTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCloseTime(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  };

  const handleLocalityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocality(event.target.value);
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDistrict(event.target.value);
  };

  const handleZipcodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value);
  };

  const handleTelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTel(event.target.value);
  };

  const handleProvinceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProvince(event.target.value);
  };

  const handleRestaurantChange =async()=>{
    try{
        if(openTime && closeTime && selectedDays && description && street && locality && district && province && zipcode && tel){
            const payload = {
                description: description,
                tel: tel,
                street: street,
                locality: locality,
                district: district,
                closeDate: selectedDays,
                open: openTime,
                close: closeTime,
            };

            const response = await axios.put(`${config.api}/restaurants/${rid}`, payload, config.headers());

            if (response.data.success) {
                Swal.fire({
                    title: "Confirmed",
                    text: "Updated successfully",
                    icon: "success",
                    timer: 2000
                });

                router.push(`/restaurants/owner`)
            } else {
                throw new Error(response.data.message);
            }
        } else {
            throw new Error("Please try again");
        }
    } catch(error: any) {
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            timer: 2000
        });
    }
}

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={restaurant ? restaurant.img : '/test/'}
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
          <input type="text" value={description} className={styles.description} onChange={handleDescriptionChange}/>
        </div>
        <div className={styles.belowContainer}>
          <div className={styles.addressContainer}>
            <div className={styles.address}>
              <div>
                <div><h1>Street :&ensp;</h1> <input type="text" value={street} onChange={handleStreetChange}/></div>
                <div><h1>District :&ensp;</h1> <input type="text" value={district} onChange={handleDistrictChange}/></div>
                <div><h1>Zip Code :&ensp;</h1> <input type="text" value={zipcode} onChange={handleZipcodeChange}/></div>
              </div>
              <div>
                <div><h1>Locality :&ensp;</h1> <input type="text" value={locality} onChange={handleLocalityChange}/></div>
                <div><h1>Province :&ensp;</h1> <input type="text" value={province} onChange={handleProvinceChange}/></div>
                <div><h1>Telephone :&ensp;</h1> <input type="text" value={tel} onChange={handleTelChange}/></div>
              </div>
            </div>
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.time}>
              <h1>Open - Close Time</h1>
              <div>
                <input
                  type="time"
                  value={openTime}
                  onChange={handleOpenTimeChange}
                ></input>
                <h2>&ensp;-&ensp;</h2>
                <input
                  type="time"
                  value={closeTime}
                  onChange={handleCloseTimeChange}
                ></input>
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
                      checked={!selectedDays.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                      style={{accentColor: "#333333"}}
                    />
                  </div>
                )
              )}
            </div>
            <div></div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleRestaurantChange}>Done</button>
        </div>
      </div>
    </div>
  );
}
