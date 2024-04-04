"use client"

import config from '../utils/config';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'
function SignUpForm({role}:{role:string}){
    const router = useRouter()
    

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const handleSubmit = async(e:any) => {
        e.preventDefault();

        try{
            if(confirmpassword !== password) {
                throw new Error('Password and Confirm Password is not match')
            }

            const user ={
                firstname,
                lastname,
                tel,
                email,
                password
            };

            console.log(user);

            const url: string = `${config.api}/users/${role}`

            console.log(url);

            //POST
            const response = await axios.post(url, user);
            console.log('working');
            if (response.data.success === true) {
                Swal.fire({
                    title: 'Sign Up',
                    text: 'Sign up successful.',
                    icon:'success',
                    timer: 2000
                });
            
                setTimeout(() => {
                    router.push('/signin')
                }, 1000)
            } else {
                throw new Error("Sign Up failed.");
            }
        }catch(error:any){
            Swal.fire({
                title: "Sign Up Error",
                text: error.response ? error.response.data.message : error,
                icon:'error',
                timer: 2000
              });
            console.error("Sign Up Error:", error);
        }
    }


    return(
        <div>
            <div>
                <div>
                    <input type="text" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
                    <input type="text" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
                    <input type="text" placeholder="Tel" value={tel} onChange={(e) => setTel(e.target.value)} required/>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <input type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    <button type='submit' onClick={(e)=>handleSubmit(e)}>Register &#8594;</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;