'use client'
import config from "@/utils/config";
export default async function getUser() {
    await new Promise((resolve)=>setTimeout(resolve,1000))
    const response = await fetch(`${config.api}/auth/me`, config.headers());

    if (!response.ok) {
        throw new Error('Failed to fetch user: ' + response.statusText);
    }

    return await response.json();
}