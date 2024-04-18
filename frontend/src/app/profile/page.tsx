'use client'
import getUser from "@/libs/getUser";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import ReviewSlider from "@/components/ReviewSlider";
import EditProfile from "@/components/EditProfile";


interface UserItem{
    email:string,
    firstName:string,
    lastName:string,
    tel:string,
    role:string,
    img:string,
    _id:string
}
const ProfilePage = () => {
    const [user, setUser] = useState<UserItem>();
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await getUser();
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUser();
    }, []);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleCloseEdit = () => {
      setIsEditing(false);
    };
  
    const updateUserProfile = (updatedUser: UserItem) => {
        setUser(updatedUser);
        setIsEditing(false);
      };
  
    return (
      <div>
        <div>Account</div>
        <Image src={user?.img ? user.img : '/img/userAnonymous.png'} alt="user picture" width={200} height={200} />
        <div>
          {user?.firstName} {user?.lastName}
        </div>
        <div>role: {user?.role}</div>
        <div>email: {user?.email}</div>
        <div>tel: {user?.tel}</div>
        <button onClick={handleEdit}>Edit</button>
        <div>
          <div>My Review</div>
          <ReviewSlider/>
        </div>
        {isEditing && user && <EditProfile user={user} onClose={handleCloseEdit} onUpdate={updateUserProfile} />}
      </div>
    );
  };
  
  export default ProfilePage;