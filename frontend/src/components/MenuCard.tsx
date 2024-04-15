"use client"

import config from "@/utils/config";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";

export default function MenuCard({rid}: {rid: string}): JSX.Element {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imgPreview, setImgPreview] = useState<string>('');
    const [imgFile, setImgFile] = useState<File | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const selectedImg = e.target.files?.[0];
        if (selectedImg) {
            setImgFile(selectedImg);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedImg);
        } else {
            // Handle case where no file is selected
            setImgFile(null);
            setImgPreview('');
        }
    };

    const submit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (imgFile) {
            formData.append("img", imgFile);
        }

        const respose = await axios.post(`${config.api}/restaurants/${rid}/menus`, formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "https://se-api-test.vercel.app/"
            }
        })

        if (respose.data.success === true) {
            Swal.fire({
                title: "Create Menu",
                text: "this manu has been created.",
                icon: "success",
                timer: 2000
            })
        }
    };

    return (
        <form onSubmit={submit} className="w-[380px] md:w-[729px] h-[478px] md:h-[436px] bg-[#F0F0F0] rounded-[24px] flex flex-col md:flex-row items-center md:items-start">
            <div className="flex flex-col justify-center items-center">
                <label htmlFor="img" className="cursor-pointer">
                    <img
                        src={imgPreview || 'placeholder_image_url'}
                        className="w-[332px] md:w-[346px] h-[191px] md:h-[265px] bg-gray-300 rounded-[24px] mt-[24px] md:mt-[24px] md:ml-[24px] object-cover"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                </label>
                <input
                    id="img"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </div>
            <div className="mt-[16px] md:mt-[32px] md:ml-[24px] flex-grow">
                <div>
                    <input
                        className="text-black text-[18px] md:text-[28px] font-medium bg-[#F0F0F0]"
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <hr className="mr-6 border border-gray-400" />
                </div>
                <div className="mt-[16px] md:mt-[32px]">
                    <h1 className="text-black text-[16px] md:text-[19px] font-medium">Description</h1>
                    <textarea
                        className="w-[332px] md:w-[311px] h-[93px] md:h-[146px] border border-gray-400 rounded-[4px] mt-[8px] p-3 bg-[#F0F0F0] text-gray-600 text-[11px] md:text-[14px]"
                        placeholder="Enter desription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="text-end mt-[10px] md:mt-[10px] md:mr-[20px]">
                    <button
                        type="submit"
                        className="mt-[12px] md:mt-[70px] w-[78px] md:w-[138px] h-[28px] md:h-[43px] rounded-[40px] bg-transparent border-2 border-[#333333] text-[#333333] text-[11px] md:text-[18px] transition-all duration-300 ease-in-out hover:bg-[#333333] hover:text-white hover:border-[#333333] focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-opacity-50"
                    >
                        Done
                    </button>

                </div>
            </div>
        </form>
    );
}
