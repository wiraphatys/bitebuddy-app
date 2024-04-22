//'use client'
import config from "@/utils/config";

export default async function getReservations({ rid }: { rid?: string }) {
    
    await new Promise((resolve)=>setTimeout(resolve,1000))
    let response = null
    if(localStorage.getItem('role')==='user'||localStorage.getItem('role')==='admin'){
        response = await fetch(`${config.api}/reservations`, config.headers());
    }else{
        response = await fetch(`${config.api}/restaurants/${rid}/reservations`, config.headers());
    }
    console.log(await response.json())
    if (!response.ok) {
        throw new Error('Failed to fetch reservations: ' + response.statusText);
    }

    return await response.json();
}