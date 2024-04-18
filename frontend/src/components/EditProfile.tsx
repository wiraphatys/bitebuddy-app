'use clent'
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import config from '@/utils/config';

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
  
    const handleSubmit = async () => {
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
        <div className="edit-popup">
            <h2>Edit Profile</h2>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default EditProfile;