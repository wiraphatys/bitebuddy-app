'use client'

import React, { useEffect, useState } from "react";
import styles from './page.module.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import datepickerLocalization from "@/components/DatepickerLocalization";
import getRestaurant from "@/libs/getRestaurant";
import DateValidationShouldDisableDate from "@/components/Calendar";
import dayjs, { Dayjs } from "dayjs";

interface RestaurantItem {
    _id: string,
    name: string,
    img: string,
    description: string,
    tel: string,
    closeDate: number[],
    open: string,
    close: string,
    owner: string,
    averageRating: number,
}

function ReservationPage({params}:{params:{rid:string}}){
    const router = useRouter();
    
    const [restaurant, setRestaurant] = useState<RestaurantItem>()
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [seat, setSeat] = useState<number>(1);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await getRestaurant(params.rid);
                console.log(response);
                setRestaurant(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        };

        fetchRestaurant();
    }, [params.rid]);

    
    const isCloseDate = (date: Date) => {
        const day = dayjs(date);
        let rec = restaurant?.closeDate;
    
        if (rec) {
            for (let i = 0; i < rec.length; i++) {
                if (day.day() === rec[i]) {
                    return true;
                }
            }
        }
    
        return false;
    };
    
    const handleDateTimeChange = (newDate: Date | null) => {
        setSelectedDate(newDate);
    };

    const handleTimeChange = (newTime: Date | null) => {
        setSelectedTime(newTime);
    };
   

    const handleReservation =async()=>{
        try{
            if(selectedDate && selectedTime){
                const formattedDate: string = selectedDate.toISOString();
                const formattedTime: string = selectedTime.toISOString().split('T')[1]; // Extracting time portion
                const dateTime: string = formattedDate.split('T')[0] + 'T' + formattedTime;

                const payload = {
                    datetime: dateTime,
                    seat:0
                };

                const response = await axios.post(`${config.api}/restaurants/${params.rid}/reservations`, payload, config.headers());

                if (response.data.success) {
                    Swal.fire({
                        title: "Confirmed",
                        text: "Reserved successfully",
                        icon: "success",
                        timer: 2000
                    });

                    router.push("/myreservation")
                } else {
                    throw new Error(response.data.message);
                }
            } else {
                throw new Error("Please select both date and time.");
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
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datepickerLocalization}>
            <div className={styles.container}>
                <div className="flex flex-row">
                    <div className='text-gray-400 text-[28px] md:text-[42px] py-6 pl-[72px]'>Restaurant &gt; Detail</div>
                    <div className='text-gray-600 text-[28px] md:text-[42px] py-6'>&nbsp; &gt; Reservation</div>
                </div>

                <div className="flex flex-row h-[84%]" >
                    <div className="w-[50%] h-auto ml-[24px] mr-[12px] mb-[24px] relative rounded-[24px] overflow-hidden">
                        <Image src="/img/kfc.jpg" alt="icon" layout="fill" objectFit="cover" className="rounded-[24px]" />
                    </div>

                    <div className="flex flex-col w-[50%] h-full">

                        <div className={styles.card}>
                            <div className="flex flex-row items-center">
                                <p className="text-[28px]">{restaurant?.name}</p> 
                                <p className="ml-[12px] text-[18px]">Tel :</p>
                                <p className="text-[16px] text-gray-600 ml-[6px]">{restaurant?.tel}</p>
                            </div>

                            <p className="text-[18px] mt-[32px]">Description</p>
                            <div className={styles.information}>
                                <p>{restaurant?.description}</p>   
                            </div>
                        </div>
                            
                        <div className={styles.card}>

                            <div className="w-full">
                                <form>
                                    <FormControl className="w-full">
                                        <div className="flex flex-row items-center">
                                            <p>Date</p>
                                            <DatePicker
                                                value={selectedDate}
                                                onChange={handleDateTimeChange}
                                                className="mt-[8px] ml-[12px] w-full"
                                                shouldDisableDate={isCloseDate}
                                                views={['year', 'month', 'day']}
                                            />
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <p>Time</p>
                                            <TimePicker
                                                value={selectedTime}
                                                onChange={handleTimeChange}
                                                className="mt-[8px] ml-[12px] w-full"
                                            />
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <p>Seat</p>
                                            <input
                                                type="number"
                                                value={seat}
                                                min={1}
                                                onChange={(e) => setSeat(parseInt(e.target.value))}
                                                placeholder="Number of Seats"
                                                className={styles.seat}
                                                
                                            />
                                        </div>
                                        
                                    </FormControl>
                                </form>
                            </div>
                        </div>

                        <button className={styles.button} type="button" onClick={handleReservation}>Done</button>
                        
                    </div>
                </div>
            </div>
        </LocalizationProvider>
    );
    
}

export default ReservationPage;