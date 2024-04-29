'use client'
import getUser from "@/libs/getUser";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import ReviewSlider from "@/components/ReviewSlider";
import EditProfile from "@/components/EditProfile";
import styles from './page.module.css'
import Loading from "@/components/Loading";

interface UserItem {
  email: string,
  firstName: string,
  lastName: string,
  tel: string,
  role: string,
  img: string,
  _id: string
}
const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<UserItem>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await getUser();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false)
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

  const handleLogout = () => {
    localStorage.clear();
  }

  return (
    <>
      {
        loading ? (<Loading />) : (
          <>
            <div className={styles.page}>
              <div className={styles.accountHeader}>Account</div>
              <div className={styles.userCard}>
                <div className={styles.userContent}>
                  <img
                    src={user?.img ? user.img : '/img/userAnonymous.png'}
                    alt="user picture"
                    width={200}
                    height={200}
                    className={styles.userImage}
                  />
                  <div className={styles.userInfo}>
                    <div className={styles.username}>
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="user-detail">
                      <div>Role : {user?.role}</div>
                      <div>Email : {user?.email}</div>
                      <div>Telephone : {user?.tel}</div>
                    </div>


                  </div>
                  <div>
                    <a href="/"><button className={styles.editButton} onClick={handleLogout}>Logout</button></a>
                    <button onClick={handleEdit} className={styles.editButton}>Edit</button>
                  </div>
                </div>
                <div>

                  {isEditing && user ? <EditProfile user={user} onClose={handleCloseEdit} onUpdate={updateUserProfile} /> : null}
                </div>
              </div>
              {
                localStorage.getItem('role') !== 'user' ? null : <div><div className={styles.reviewHeader}>My Review</div>
                  <div className="mt-[12px]">
                    <ReviewSlider />
                  </div>
                </div>
              }
            </div>
          </>
        )
      }
    </>
  );
};

export default ProfilePage;