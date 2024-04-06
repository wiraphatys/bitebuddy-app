import config from "@/utils/config";

export default async function getRestaurant(id:string) {
    
    await new Promise((resolve)=>setTimeout(resolve,1000))
    const response = await fetch(`${config.api}/restaurants/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch restaurant: ' + response.statusText);
    }

    return await response.json();
}