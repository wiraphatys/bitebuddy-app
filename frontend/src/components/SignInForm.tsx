'use client'

import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'
import config from '@/utils/config';

function SignInForm(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(event:any) => {
        event.preventDefault();
        try{
            const user = {
                email,
                password
            };

            const response = await axios.post(`${config.api}/auth/login`,user);

            if(response.data.success === true){
                Swal.fire({
                    title:'Sign In',
                    text: 'Sign in successful.',
                    timer: 2000,
                    icon:'success'
                });

                const token = response.data.token;
                console.log('Token from API:', token);
                localStorage.setItem(config.tokenName,token);
                console.log(localStorage.getItem(config.tokenName)); // Log the token
                console.log(config.headers());

                setTimeout(() => {
                    router.push('/')
                }, 1000)
            }else{
                throw new Error('Sign Infailed.');
            }
        }catch(error:any){
            Swal.fire({
                title: "Sign In Error",
                text: error.response ? error.response.data.message : "An error occurred",
                icon:'error',
                timer: 2000
            });
            console.log(error.message);
            console.error("Sign In Error:", error);
        }
    };
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='&#9993; Email'required/>
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'required/>
                </div>
                <button type="submit">Sign In &#8594;</button>
            </form>
            <div>Not a member? <a href="/signup">Create an account.</a></div>
        </div>
    );
}

export default SignInForm;