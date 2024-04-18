//'use client'
import config from "@/utils/config";

export default async function getReservations() {
    
    await new Promise((resolve)=>setTimeout(resolve,1000))
    let response = null
    if(localStorage.getItem('role')==='user'||localStorage.getItem('role')==='admin'){
        response = await fetch(`${config.api}/reservations`, config.headers());
    }else{
        response = await fetch(`${config.api}/restaurants/6611032a17bade4a115e8e76/reservations`, config.headers());
    }
    console.log(response)
    if (!response.ok) {
        throw new Error('Failed to fetch reservations: ' + response.statusText);
    }

    return await response.json();
}