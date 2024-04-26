'use client'

import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'
import config from '@/utils/config';
import sessionStorage from "redux-persist/es/storage/session";

function SignInForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const user = {
                email,
                password
            };

            const response = await axios.post(`${config.api}/auth/login`,user);
            const token = response.data.token;
            const role = response.data.role;
            if(response.data.success === true){

                Swal.fire({
                    title: 'Sign In',
                    text: 'Sign in successful.',
                    timer: 2000,
                    icon: 'success'
                });

                localStorage.setItem(config.tokenName, token);
                localStorage.setItem('role', role);


                setTimeout(() => {
                    if(role === 'user' || 'admin'){
                        router.push('/restaurants')
                    }else {
                        router.push('/restaurants/owner')
                    }
                }, 1000)
            }else{
                throw new Error('Sign In failed.');
            }
        } catch (error: any) {
            Swal.fire({
                title: "Sign In Error",
                text: error.response ? error.response.data.message : "An error occurred",
                icon: 'error',
                timer: 2000
            });
            console.log(error.message);
            console.error("Sign In Error:", error);
        }
    };
    return (
        <div className="signin-container">
            <form onSubmit={handleSubmit} className="signin-form">
                <h2>Sign In</h2>
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='&#9993; Email' required />
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                </div>
                <button type="submit">Sign In &#8594;</button>
                <div className="create-account">Not a member? <a href="/signup">Create an account.</a></div>
            </form>
            <style jsx>{`
                .signin-container {
                    background-color: #ffffff; /* White background for page */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    flex-direction: column;
                }

                .signin-form {
                    width: 400px; /* Increased width of the form */
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #f0f0f0; /* Light gray background for register card */
                    border-radius: 25px;    
                }
                h2 {
                    margin-bottom: 20px;
                    font-size: 35px;
                    text-align: center;
                }

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

                .create-account{
                    padding-top: 10px;
                }

                a {
                    
                    color: black ;
                    text-decoration: none;
                }

                a:hover {
                    opacity: 0.4 ;
                    color: #575757;
                }
            `}</style>
        </div>
    );
}

export default SignInForm;