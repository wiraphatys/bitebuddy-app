'use client'

import RestaurantSlider from "@/components/RestaurantSlider";
import getRestaurants from "@/libs/getRestaurants";
import styles from './page.module.css';
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Loading from "@/components/Loading";

export default function RestaurantsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [restaurants, setRestaurants] = useState({ success: false, count: 0, data: [] });
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await getRestaurants({ search: searchQuery });
            setRestaurants(response);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        } finally {
            setLoading(false)
        }
    }

    const handleSearchInputChange = (event:any) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchButtonClick = () => {
        setSearchQuery(searchTerm.trim());
    };

    const handleKeyPress = (event:any) => {
        if (event.key === 'Enter') {
            setSearchQuery(searchTerm.trim());
        }
    };

    return (
        <>
            {
                loading ? (<Loading />) : (
                    <>
                        <div className={styles.page}>
                            <div className="form-control">
                                <div className='grid grid-cols-12'>
                                    <input type="text" placeholder="Search..." className="col-span-10 md:col-span-11 input input-bordered mr-4" value={searchTerm}
                                        onChange={handleSearchInputChange}
                                    />
                                    <button className='btn bg-gray-400 hover:bg-gray-600 text-white col-span-2 md:col-span-1'
                                        onClick={handleSearchButtonClick}
                                    ><SearchIcon /></button>
                                </div>
                            </div>
                            <RestaurantSlider restaurantsJson={restaurants} />
                        </div>
                    </>
                )
            }
        </>
    );
}
