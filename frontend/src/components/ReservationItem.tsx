// "use client"
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import PersonIcon from '@mui/icons-material/Person';
// import React, { useState } from 'react';
// import { ReservationItem,DeleteJSON,ReservationListJSON } from '../../interface';
// import { useRouter } from 'next/navigation';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import config from '@/utils/config';

// function ReservationItemComponent ({reservations}:{reservations: ReservationListJSON}){

//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
//         return date.toLocaleDateString(undefined, options);
//     };
//     const formatTime = (dateTimeString: string) => {
//         const dateTime = new Date(dateTimeString);
//         const options = { hour: '2-digit' as const, minute: '2-digit' as const };
//         return dateTime.toLocaleTimeString(undefined, options);
//     };
//     const handleEditClick = (rid: string) => {
//         router.push(`/myreservation/edit/${rid}`)
//       }
    
//     const handleDelete = (rid: string) => {
//         Swal.fire({
//           title: "Delete Confirmation",
//           text: "Are you sure to delete this reservation",
//           icon:'question',
//           showCancelButton: true,
//           cancelButtonText: "Cancel",
//           confirmButtonText: "Delete"
//         }).then(async (res) => {
//           if (res.isConfirmed) {
//             try {
//               const response = await axios.delete<DeleteJSON>(`${config.api}/myreservations/${rid}`, config.headers())
//               if (response.data.success === true) {
//                 Swal.fire({
//                   title: "Deleted Reservation",
//                   text: "Reservation has been deleted.",
//                   icon:'success',
//                   timer: 2000
//                 })
    
//                 // delete target item from array reservationList
//                 //reservations=(x => x.filter(item => item._id !== rid))
    
//               }
//             } catch (err) {
//               Swal.fire({
//                 title: "Deleting Error",
//                 text: `delete failed: ${err}`,
//                 timer: 2000
//               })
//             }
//           }
//         })
//       }

//     const router = useRouter()
//     return (
//         <>
//             <div className='h-[90vh] w-full mt-[10vh]'>
//             <div className='container mx-auto lg:w-1/2 min-h-screen px-10 lg:px-0 pt-10'>
//                 <p className='text-center text-gray-600 text-[36px] md:text-[48px] py-4'>My reservation</p>

//                     {
//                     (reservations.count === 0)? (
//                         <div className="border border-gray-200 p-4 px-8 mt-4  hover:bg-gray-100  bg-white block text-left">
//                         <p className='font-semibold mt-1'>Reservation in history is empty.</p>
//                         <button className="hover:bg-gray-400 hover:text-white text-gray-400 my-2 py-1 px-4 border border-gray-400" onClick={(e)=>{e.stopPropagation; router.push("/campground")}}>make new booking</button>
//                         </div>
//                     ) : reservations.data.map((reservation) => (
//                         reservation.restaurant !== null ?
//                         <div key={reservation._id} className="border border-gray-200 p-4 px-8 mt-4  hover:bg-gray-100  bg-white block text-left">
//                         <h2 className='text-gray-600 text-lg'>{reservation.restaurant.name}</h2>
//                         <p className='text-gray-400 my-2'>
//                             <LocationOnIcon className='text-gray-400' /> {reservation.restaurant.street} {reservation.restaurant.locality} {reservation.restaurant.district} {reservation.restaurant.province}
//                         </p>
//                         <p className='text-gray-400 my-2'>
//                             <LocalPhoneIcon className='text-gray-400' /> {reservation.restaurant.tel}
//                         </p>
//                         <p className='text-gray-400 my-2'>
//                             <CalendarMonthIcon className='text-gray-400' /> {formatDate (reservation.datetime)}
//                         </p>
//                         <p className='text-gray-400 my-2'>
//                             <CalendarMonthIcon className='text-gray-400' /> {formatTime (reservation.datetime)}
//                         </p>
//                         {
//                             localStorage.getItem('role') === "admin" ?
//                             <p className='text-gray-400 my-2'>
//                                 <PersonIcon className='text-gray-400' /> {reservation.user}
//                             </p>
//                             : ''
//                         }
//                         <button className="hover:bg-gray-400 hover:text-white text-gray-400 m-2 py-1 px-4 border border-gray-400"
//                             onClick={() => handleEditClick(reservation._id)}
//                         >Edit</button>
        
//                         <button className="hover:bg-gray-400 hover:text-white text-gray-400 m-2 py-1 px-4 border border-gray-400"
//                             onClick={() => handleDelete(reservation._id)}
//                         >Delete</button>
//                         </div> : ''
//                     ))
//                     }

                    
//                 </div>
//             </div>
        
        
//         </>
//     );
// };
// export default ReservationItemComponent;