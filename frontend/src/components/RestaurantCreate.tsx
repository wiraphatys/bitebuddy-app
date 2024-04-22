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

export default function RestaurantCreate({ rid }: { rid: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [selectedDays, setSelectedDays] = useState<Number[]>([]);
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [district, setDistrict] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [tel, setTel] = useState("");
  const [province, setProvince] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>('');


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const selectedImg = e.target.files?.[0];
        if (selectedImg) {
            setImgFile(selectedImg);
            const reader = new FileReader();
            reader.onloadend = () => {
              setImgPreview(reader.result as string);
          };
            reader.readAsDataURL(selectedImg);
        } else {
            // Handle case where no file is selected
            setImgFile(null);
            setImgPreview('');
        }
    };

  const handleCheckboxChange = (day: Number) => {
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
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurant();
  }, [rid]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

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
        if(name && openTime && closeTime && selectedDays && description && street && locality && district && province && zipcode && tel){
          const formData = new FormData();
          formData.append("name", name);
          if(imgFile){
            formData.append("img", imgFile);
          }
          formData.append("description", description);
          formData.append("tel", tel);
          formData.append("street", street);
          formData.append("locality", locality);
          formData.append("district", district);
          formData.append("province", province);
          formData.append("zipcode", zipcode);
          selectedDays.map((day:Number) => {
            formData.append("closeDate", JSON.stringify(day))
          })
          formData.append("open", openTime);
          formData.append("close", closeTime);
          formData.forEach((value, key) => {
            console.log(key + ': ' + value);
          });
            const response = await axios.post(`${config.api}/restaurants/`, formData, {
              headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  'Content-Type': 'multipart/form-data',
                  'Access-Control-Allow-Origin': "https://se-api-test.vercel.app/"
              }
          });

            if (response.data.success) {
                Swal.fire({
                    title: "Confirmed",
                    text: "Created successfully",
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
      console.log(error.response)
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
      <label htmlFor="img" className="cursor-pointer">
                    <img
                        src={imgPreview || 'placeholder_image_url'}
                        className="w-full h-full object-cover"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                </label>
        <input
          id="img"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{display:'none'}}
        />
      </div>
      <div>
        <div className={styles.nameContainer}>
          <div className={styles.nameText}>
            <input type="text" value={name} className={styles.name} onChange={handleNameChange} placeholder="Restaurant Name"/>
          </div>
          <h3>Description</h3>
          <input type="text" value={description} className={styles.description} onChange={handleDescriptionChange} placeholder="Description"/>
        </div>
        <div className={styles.belowContainer}>
          <div className={styles.addressContainer}>
            <div className={styles.address}>
              <div>
                <div><h1>Street :&ensp;</h1> <input type="text" value={street} onChange={handleStreetChange} placeholder="Street"/></div>
                <div><h1>District :&ensp;</h1> <input type="text" value={district} onChange={handleDistrictChange} placeholder="District"/></div>
                <div><h1>Zip Code :&ensp;</h1> <input type="text" value={zipcode} onChange={handleZipcodeChange} placeholder="Zipcode"/></div>
              </div>
              <div>
                <div><h1>Locality :&ensp;</h1> <input type="text" value={locality} onChange={handleLocalityChange} placeholder="Locality"/></div>
                <div><h1>Province :&ensp;</h1> <input type="text" value={province} onChange={handleProvinceChange} placeholder="Province"/></div>
                <div><h1>Telephone :&ensp;</h1> <input type="text" value={tel} onChange={handleTelChange} placeholder="Telephone Number"/></div>
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
