'use client'

import React, { useEffect, useState } from "react";
import styles from './page.module.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';
import getReservation from "@/libs/getReservation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)


interface ReservationItem{
    restaurant:{
        name:string,
        tel:string,
        img:string,
        description:string,
        close:string,
        open:string
    },
    user:{
        email:string
    },
    datetime:string,
    _id:string,
    count:number
}

function EditReservationPage({params}:{params:{rid:string}}){
    const router = useRouter();
    const [role, setRole] = useState<string|null>();
    const [reservation, setReservation] = useState<ReservationItem>(
        {
            restaurant:{
                name:"",
                tel:"",
                img:"",
                description:"",
                close:"",
                open:""
            },
            user:{
                email:""
            },
            datetime:"",
            _id:"",
            count:0
        }
    )
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

    useEffect(()=>{
        setRole(localStorage.getItem('role'));
        fetchData();
    },[]);

    const fetchData =async () => {
        try{
            const response = await getReservation(params.rid);

            if(response.success === true){
                setReservation(response.data);
            }
            
        }catch(error:any){
            console.log("Error: ", error);
        }
    };
    
    const handleDateTimeChange = (newTime: Date | null) => {
        setSelectedDateTime(newTime);
    };
    const formatDateTime = (dateTimeString: string) => {
        const dateTime = new Date(dateTimeString);
        const options = {
            day: '2-digit' as const,
            month: '2-digit' as const,
            year: 'numeric' as const,
            hour: '2-digit' as const,
            minute: '2-digit' as const,
            second: '2-digit' as const,
            hour12: true
        };
        return dateTime.toLocaleString(undefined, options);
    };
    

    const handleReservationChange =async()=>{
        try{
            if(selectedDateTime){
                console.log(selectedDateTime)
                console.log(new Date())
                if(selectedDateTime<new Date()){
                    throw new Error("Cannot set reservation datetime to a past datetime.");
                }
                const payload = {
                    datetime: selectedDateTime
                };
                console.log(payload)

                const response = await axios.put(`${config.api}/reservations/${params.rid}`, payload, config.headers());

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.container}>
                <div className="flex flex-row">
                    <div className='text-gray-400 text-[36px] md:text-[48px] py-6 pl-[72px]'>Reservation </div>
                    <div className='text-gray-600 text-[36px] md:text-[48px] py-6'>&nbsp; &gt; Edit</div>
                </div>

                <div className="flex flex-row h-[84%]" >
                    <div className="w-[50%] h-auto ml-[24px] mr-[12px] mb-[24px] relative rounded-[24px] overflow-hidden">
                        <Image src={reservation.restaurant.img? reservation.restaurant.img:"/img/kfc.jpg"} alt="icon" layout="fill" objectFit="cover" className="rounded-[24px]" />
                    </div>

                    <div className="flex flex-col w-[50%] h-full">

                        {
                            role==='admin'?(
                            <div className={styles.card}>
                                <div className="flex flex-row items-center">
                                    <p className="text-[18px]">User :</p>
                                    <p className="text-[16px] text-gray-600 ml-[6px]">{reservation.user.email}</p>
                                </div>
                            </div>):''
                        }

                        <div className={styles.card}>
                            <div className="flex flex-row items-center">
                                <p className="text-[28px]">{reservation.restaurant.name}</p> 
                                <p className="ml-[12px] text-[18px]">Tel :</p>
                                <p className="text-[16px] text-gray-600 ml-[6px]">{reservation.restaurant.tel}</p>
                            </div>

                            <p className="text-[18px] mt-[32px]">Description</p>
                            <div className={styles.information}>
                                <p>{reservation.restaurant.description}</p>   
                            </div>
                        </div>
                            
                        <div className={styles.card}>
                            <div className="flex flex-row items-end">
                                <p className="text-[18px]">Current date and time :</p>
                                <p className="text-[16px] text-gray-600 ml-[6px]">{formatDateTime(reservation.datetime)}</p>
                            </div>
                        
                            <div className="w-full">
                                <form>
                                    <FormControl className="w-full">
                                        <div className="mt-[12px] w-full">
                                            <DateTimePicker
                                                disablePast={true}
                                                value={selectedDateTime}
                                                onChange={(value) => {handleDateTimeChange(value)}}
                                                className="w-full"
                                            />
                                        </div>
                                       
                                    </FormControl>
                                </form>
                            </div>
                        </div>

                        <button className={styles.button} type="button" onClick={handleReservationChange}>Done</button>
                        
                    </div>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default EditReservationPage;
