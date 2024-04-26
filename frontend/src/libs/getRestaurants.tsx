'use client'
import config from "@/utils/config";

export default async function getRestaurants({ search }: { search?: string } = {}) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    let url = `${config.api}/restaurants`;
    if (search) {
        url += `?search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url, config.headers());

    if (!response.ok) {
        throw new Error('Failed to fetch restaurants: ' + response.statusText);
    }

    return await response.json();
}
