// "use client"

// import config from '../utils/config';
// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useRouter } from 'next/navigation'
// function SignUpForm({role}:{role:string}){
//     const router = useRouter()
    

//     const [firstname, setFirstname] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [tel, setTel] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmpassword, setConfirmPassword] = useState('');

//     const handleSubmit = async(e:any) => {
//         e.preventDefault();

//         try{
//             if(confirmpassword !== password) {
//                 throw new Error('Password and Confirm Password is not match')
//             }

//             const user ={
//                 firstname,
//                 lastname,
//                 tel,
//                 email,
//                 password
//             };

//             console.log(user);

//             const url: string = `${config.api}/users/${role}`

//             console.log(url);

//             //POST
//             const response = await axios.post(url, user);
//             console.log('working');
//             if (response.data.success === true) {
//                 Swal.fire({
//                     title: 'Sign Up',
//                     text: 'Sign up successful.',
//                     icon:'success',
//                     timer: 2000
//                 });
            
//                 setTimeout(() => {
//                     router.push('/signin')
//                 }, 1000)
//             } else {
//                 throw new Error("Sign Up failed.");
//             }
//         }catch(error:any){
//             Swal.fire({
//                 title: "Sign Up Error",
//                 text: error.response ? error.response.data.message : error,
//                 icon:'error',
//                 timer: 2000
//               });
//             console.error("Sign Up Error:", error);
//         }
//     }


//     return(
//         <div>
//             <div>
//                 <div>
//                     <input type="text" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
//                     <input type="text" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
//                     <input type="text" placeholder="Tel" value={tel} onChange={(e) => setTel(e.target.value)} required/>
//                     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
//                     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
//                     <input type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
//                     <button type='submit' onClick={(e)=>handleSubmit(e)}>Register &#8594;</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SignUpForm;

'use client'
import config from '../utils/config';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function SignUpForm({ role }: { role: string }) {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [img, setImg] = useState<File | null>(null); // State to store selected profile picture
    const fileInputRef = useRef<HTMLInputElement>(null); // Ref to file input element


    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0]);
        }
    };
    const handleProfilePictureClick = (e: React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger file input click
        } 
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (confirmpassword !== password) {
                throw new Error('Password and Confirm Password do not match');
            }

            const user ={
                firstName,
                lastName,
                tel,
                email,
                password,
                img
            };

            const url: string = `${config.api}/users/${role}`;

            const response = await axios.post(url, user);
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
        } catch (error:any) {
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
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col'>
                <div>Create Your Account</div>
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
                <input type="text" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input type="text" placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <input type="text" placeholder="Tel" value={tel} onChange={(e) => setTel(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type="submit">Register &#8594;</button>
            </form>
            <style jsx>{`
                .profile-picture {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-bottom: 10px;
                    cursor: pointer; /* Add cursor pointer */
                    border: 1px solid black; /* Add border */
                }

                .profile-picture img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            `}</style>
        </div>
    );
}

export default SignUpForm;