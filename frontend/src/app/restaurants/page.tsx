'use client'

import RestaurantSlider from "@/components/RestaurantSlider";
import getRestaurants from "@/libs/getRestaurants";
import styles from './page.module.css';
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function RestaurantsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [restaurants, setRestaurants] = useState({ success: false, count: 0, data: [] });

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const fetchData = async () => {
        try {
            const response = await getRestaurants({ search: searchQuery });
            setRestaurants(response);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
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
        <div className={styles.page}>
            <div className="flex flex-row justify-between items-center">
                <p className="text-[48px]">Restaurant</p>
                <div className={styles.searchBar}>
                    <input
                        id="searchBar"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        onKeyPress={handleKeyPress}
                        className={styles.input}
                    />
                    <button onClick={handleSearchButtonClick} className="bg-white rounded-full p-[4px]">
                        <SearchIcon sx={{ fontSize: 24 }} />
                    </button>
                </div>
            </div>
            <RestaurantSlider restaurantsJson={restaurants} />
        </div>
    );
}
