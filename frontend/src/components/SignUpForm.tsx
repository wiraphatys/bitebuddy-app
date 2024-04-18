'use client'
import config from '../utils/config';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import defaultImage from '../img/userAnonymous.png';

function SignUpForm({ role }: { role: string }) {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [img, setImg] = useState<File | null>(null) 
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0]);
        }
    };
    const handleProfilePictureClick = (e: React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (confirmpassword !== password) {
                throw new Error('Password and Confirm Password do not match');
            }

            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('tel', tel);
            formData.append('email', email);
            formData.append('password', password);
            if (img) {
                formData.append('img', img);
            }

            const url: string = `${config.api}/users/${role}`;

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('working');
            if (response.data.success === true) {
                Swal.fire({
                    title: 'Sign Up',
                    text: 'Sign up successful.',
                    icon: 'success',
                    timer: 2000
                });

                setTimeout(() => {
                    router.push('/signin');
                }, 1000);
            } else {
                throw new Error('Sign Up failed.');
            }
        } catch (error: any) {
            Swal.fire({
                title: 'Sign Up Error',
                text: error.response ? error.response.data.message : error.message,
                icon: 'error',
                timer: 2000
            });
            console.error('Sign Up Error:', error);
        }
    };

    return (
        <div className='signup-container'>
            <form onSubmit={(e) => handleSubmit(e)} className='register-form'>
                <h2>Create Your Account</h2>
                <label htmlFor="profilePictureInput" onClick={handleProfilePictureClick}>
                    <div className="profile-picture" >
                        {img && <img src={URL.createObjectURL(img)} alt="Profile" />}
                    </div>
                </label>
                <input
                    id="profilePictureInput"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                />
                <input className='insert-form'type="text" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input type="text" placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <input type="text" placeholder="Tel" value={tel} onChange={(e) => setTel(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type="submit">Register &#8594;</button>
            </form>
            <style jsx>{`
                .signup-container {
                    background-color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    flex-direction: column;
                }

                .register-form {
                    width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #f0f0f0; /* Light gray background for register card */
                    border-radius: 25px;
                }

                h2 {
                    margin-bottom: 20px;
                    font-size: 45px;
                    text-align: center;
                }

                

                .profile-picture {
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right : auto;
                    margin-left : auto;
                    margin-bottom: 30px;
                    cursor: pointer; 
                    border: 1px solid #ccc;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    
                }

                .profile-picture img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                input[type="text"],
                input[type="email"],
                input[type="password"] {
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
                    opacity: 0.4 ;
                    background-color: #575757;

                }
            `}</style>
        </div>

    );
}

export default SignUpForm;