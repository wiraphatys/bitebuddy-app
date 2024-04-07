// import React from 'react';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import PersonIcon from '@mui/icons-material/Person';

// interface ReservationItem{
//     restaurant:{
//         name:string,
//         tel:string,
//         street:string,
//         locality:string,
//         district:string,
//         province:string
//     },
//     datetime:Date
// }

// type BookingItemProps = {
//   booking: BookingItemType;
// };

// const BookingItem: React.FC<BookingItemProps> = ({ booking }) => {
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
//     return date.toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="border border-gray-200 p-4 px-8 mt-4 hover:bg-gray-100 bg-white block text-left">
//       <h2 className="text-gray-600 text-lg">{booking.campground.name}</h2>
//       <p className="text-gray-400 my-2">
//         <LocationOnIcon className="text-gray-400" /> {booking.campground.address}
//       </p>
//       <p className="text-gray-400 my-2">
//         <LocalPhoneIcon className="text-gray-400" /> {booking.campground.telephoneNumber}
//       </p>
//       <p className="text-gray-400 my-2">
//         <CalendarMonthIcon className="text-gray-400" /> {formatDate(booking.bookingDate)}
//       </p>
//       {booking.user.role === 'admin' && (
//         <p className="text-gray-400 my-2">
//           <PersonIcon className="text-gray-400" /> {booking.user.name}
//         </p>
//       )}
//     </div>
//   );
// };

// export default BookingItem;