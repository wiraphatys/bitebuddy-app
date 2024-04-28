'use clent'
import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import Swal from 'sweetalert2';
import config from '@/utils/config';
import styles from './menu.module.css';

interface UserItem {
    email: string;
    firstName: string;
    lastName: string;
    tel: string;
    role: string;
    img: string;
    _id: string;
}
interface EditProfileProps {
    user: UserItem;
    onClose: () => void;
    onUpdate: (updatedUser: UserItem) => void;
}  
const EditProfile = ({ user, onClose, onUpdate }: EditProfileProps) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [tel, setTel] = useState(user.tel);
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const payload = {
                firstName,
                lastName,
                tel,
            };
            const url: string = `${config.api}/users/${user._id}`;
            const response = await axios.put(url, payload, config.headers());
            if (response.data.success) {
                Swal.fire({
                    title: 'Success',
                    text: 'Profile updated successfully',
                    icon: 'success',
                    timer: 2000,
                });

                onUpdate({ ...user, ...payload }); // Include the complete user data when updating
            } else {
                throw new Error(response.data.message);
            }
            onClose();
        } catch (error: any) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'An error occurred while updating the profile',
                icon: 'error',
                timer: 2000,
            });
        }
    };

    return (
        <div className={styles.overlay}>
        <div className={styles.create}>
    <form onSubmit={handleSubmit} className="edit-form">
        <h2>Edit Profile</h2>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
    </form>
    <style jsx>{`
    .edit-popup {
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        -index: 999; /* Ensure popup is on top of other elements */
    }

    .edit-form {
        width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f0f0f0;
        border-radius: 25px;
    }

    h2 {
        margin-bottom: 20px;
        font-size: 35px;
        text-align: center;
    }

    input[type="text"],
    input[type="tel"] {
        background-color: #f0f0f0;
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #575757;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover {
        opacity: 0.4;
        background-color: #575757;
    }
`}</style>

</div>
</div>
        
    );
};

export default EditProfile;