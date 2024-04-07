"use client"

import config from '@/utils/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface ReservationItem{
  restaurant:{
      name:string,
      tel:string,
      street:string,
      locality:string,
      district:string,
      province:string
  },
  user:string,
  datetime:string,
  _id:string
}

interface UserRole {
  _id: string,
  role: string
}

interface UserJSON {
  success: boolean;
  data: UserRole;
  message: string;
}

interface setReservationListJSON {
  success: boolean;
  data: ReservationItem[];
}

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
      province:""
  },
  user:"",
  datetime:"",
  _id:""
  }]);
  const [user, setUser] = useState<UserRole>(Object);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    fetchUserRole();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<setReservationListJSON>(`${config.api}/reservations`);
      if (response.data.success === true) {
        setReservationList(response.data.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const fetchUserRole = async () => {
    try {
      const response = await axios.get<UserJSON>(`${config.api}/auth/me`,config.headers());
      if (response.data.success === true) {
        setUser(response.data.data)

      } else {
        throw new Error(response.data.message)
      }
    } catch (err: any) {
        if(err.message==="Request failed with status code 401"){
            Swal.fire({
                title: "Authorized failed",
                text: "Please login before reserve a restaurant",
                icon:'error',
                timer: 2000
            })

            setTimeout(() => {
                router.push("/signin")
            }, 500)
        }else{
            Swal.fire({
                title: "Error",
                text: err.message,
                icon:'error',
                timer: 2000
            })
            router.push("/")
        }
        console.log(err.message)
    }
      
  }

  // Function to format the booking date to show only the date part
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { month: '2-digit' as const, day: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString(undefined, options);
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
          const response = await axios.delete<DeleteJSON>(`${config.api}/myreservations/${rid}`, config.headers())
          if (response.data.success === true) {
            Swal.fire({
              title: "Deleted Booking",
              text: "Booking has been deleted.",
              icon:'success',
              timer: 2000
            })

            // delete target item from array bookingList
            setReservationList(prevList => prevList.filter(item => item._id !== rid))

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
    
      
        <div className='h-[90vh] w-full mt-[10vh]'>
          <div className='container mx-auto lg:w-1/2 min-h-screen px-10 lg:px-0 pt-10'>
          <p className='text-center text-gray-600 text-[36px] md:text-[48px] py-4'>My reservation</p>

            {
              reservationList.length === 0 ? (
                <div className="border border-gray-200 p-4 px-8 mt-4  hover:bg-gray-100  bg-white block text-left">
                  <p className='font-semibold mt-1'>Reservation in history is empty.</p>
                  <button className="hover:bg-gray-400 hover:text-white text-gray-400 my-2 py-1 px-4 border border-gray-400" onClick={(e)=>{e.stopPropagation; router.push("/campground")}}>make new booking</button>
                </div>
              ) : ''
            }

            {reservationList.map((reservation) => (
              <div key={reservation._id} className="border border-gray-200 p-4 px-8 mt-4  hover:bg-gray-100  bg-white block text-left">
                <h2 className='text-gray-600 text-lg'>{reservation.restaurant.name}</h2>
                <p className='text-gray-400 my-2'>
                  <LocationOnIcon className='text-gray-400' /> {reservation.restaurant.street} {reservation.restaurant.locality} {reservation.restaurant.district} {reservation.restaurant.province}
                </p>
                <p className='text-gray-400 my-2'>
                  <LocalPhoneIcon className='text-gray-400' /> {reservation.restaurant.tel}
                </p>
                <p className='text-gray-400 my-2'>
                  <CalendarMonthIcon className='text-gray-400' /> {formatDate(reservation.datetime)}
                </p>
                {
                  user.role === "admin" ?
                    <p className='text-gray-400 my-2'>
                      <PersonIcon className='text-gray-400' /> {reservation.user}
                    </p>
                    : ''
                }
                <button className="hover:bg-gray-400 hover:text-white text-gray-400 m-2 py-1 px-4 border border-gray-400"
                  onClick={() => handleEditClick(reservation._id)}
                >Edit</button>

                <button className="hover:bg-gray-400 hover:text-white text-gray-400 m-2 py-1 px-4 border border-gray-400"
                  onClick={() => handleDelete(reservation._id)}
                >Delete</button>
              </div>
            ))}
          </div>
    </div>
      
    
    </>
    
  );
}

export default MyReservationPage;