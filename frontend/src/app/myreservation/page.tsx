"use client"

import config from '@/utils/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import getReservations from '@/libs/getReservations';
import { ReservationItem } from '../../../interface';
import styles from './page.module.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface DeleteJSON {
  success: boolean;
  data: Object
}


function MyReservationPage() {
  const [reservationList, setReservationList] = useState<ReservationItem[]>([{
    restaurant:{
      name:"",
      tel:"",
      street:"",
      locality:"",
      district:"",
      province:"",
      img:""
  },
  user:{
    email:""
  },
  datetime:"",
  _id:"",
  count:0
  }]);
  const router = useRouter();
  const [role, setRole] = useState<string|null>()

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await getReservations();
        console.log(response.data)
      
      if (response.success === true) {
        setReservationList(response.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // Function to format the booking date to show only the date part
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString(undefined, options);
  };
  const formatTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    const options = { hour: '2-digit' as const, minute: '2-digit' as const };
    return dateTime.toLocaleTimeString(undefined, options);
};

  const handleEditClick = (rid: string) => {
    router.push(`/myreservation/edit/${rid}`)
  }

  const handleDelete = (rid: string) => {
    Swal.fire({
      title: "Delete Confirmation",
      text: "Are you sure to delete this reservation",
      icon:'question',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete"
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const response = await axios.delete<DeleteJSON>(`${config.api}/reservations/${rid}`, config.headers())
          if (response.data.success === true) {
            Swal.fire({
              title: "Deleted Reservation",
              text: "Reservation has been deleted.",
              icon:'success',
              timer: 2000
            })

            // delete target item from array reservationList
            setReservationList(list => list.filter(item => item._id !== rid))

          }
        } catch (err) {
          Swal.fire({
            title: "Deleting Error",
            text: `delete failed: ${err}`,
            timer: 2000
          })
        }
      }
    })
  }
  return (
    <>
        <div>
          
          <p className='text-center text-gray-600 text-[36px] md:text-[48px] py-6'>My reservation</p>

            { (role==='user'||role==='admin')?(
              (reservationList.length === 0)? (
                <div className="border border-gray-200 p-4 px-8 mt-4  hover:bg-gray-100  bg-white block text-left">
                  <p className='font-semibold mt-1'>Reservation in history is empty.</p>
                  {role==='user'?(<button className="hover:bg-gray-400 hover:text-white text-gray-400 my-2 py-1 px-4 border border-gray-400" onClick={(e)=>{e.stopPropagation; router.push("/restaurants")}}>make new reservation</button>):''}
                </div>
              ) : reservationList.map((reservation) => (
                reservation.restaurant !== null ?
                <div key={reservation._id} className={styles.card}>
                  <div className='flex flex-row justify-between'>
                    <div className='text-3xl font-semibold'>{reservation.restaurant.name}</div>
                    <div>
                      <button className={styles.button} 
                        onClick={() => handleEditClick(reservation._id)}
                      >Edit</button>
                      <button className={styles.button} 
                        onClick={() => handleDelete(reservation._id)}
                      >Delete</button>
                    </div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div>
                      <div className='font-medium text-xl my-[13px]'>Address</div> 
                      <div className={styles.address}>{reservation.restaurant.street} {reservation.restaurant.locality} {reservation.restaurant.district} {reservation.restaurant.province}</div>
                    </div>
                    <div>
                      <div className='flex flex-row items-center'>
                        <CalendarMonthIcon/><div className={styles.information}>{formatDate (reservation.datetime)}</div>
                      </div>
                      <div className='flex flex-row items-center'>
                        <AccessTimeIcon/> <div className={styles.information}>{formatTime (reservation.datetime)}</div>
                      </div>
                      <div className='flex flex-row items-center'>
                        <LocalPhoneIcon/><div className={styles.information}>{reservation.restaurant.tel}</div> 
                      </div>
                      {
                        role === 'admin'?(
                          <div className='flex flex-row items-center'>
                            <PersonIcon/><div className={styles.information}>{reservation.user.email}</div>
                          </div>
                        ):''
                      }
                    </div>
                  </div>
                  
                  
                </div> : ''
              ))
            ):(
              (reservationList.length === 0)? (
                <div className="border border-gray-200 p-4 px-8 mt-4  hover:bg-gray-100  bg-white block text-left">
                  <p className='font-semibold mt-1'>Reservation in history is empty.</p>

                </div>
              ) : reservationList.map((reservation) => (
                reservation.restaurant !== null ?
                <div key={reservation._id} className = {styles.card}>
                  <div className='flex flex-row justify-between'>
                    <div className='flex flex-row items-center'>
                      <PersonIcon/> 
                      <div className={styles.information}>{reservation.user.email}</div>
                    </div>
                  </div>
                  <p className='flex flex-row items-center'>
                    <AccessTimeIcon/> <p className={styles.information}>{formatDate (reservation.datetime)}</p>
                  </p>
                  
                  <div className='flex flex-row items-center'>
                    <CalendarMonthIcon />
                    <div className={styles.information}>{formatTime (reservation.datetime)}</div>
                  </div>
                  
                  
                </div> : ''
              ))
            )}

            
          
    </div>
      
    
    </>
    
  );
}

export default MyReservationPage;