import config from "@/utils/config";

export default async function getReviews(id?:string) {

    await new Promise((resolve)=>setTimeout(resolve,1000))
    let response = null
    if(id){
        response = await fetch(`${config.api}/restaurants/${id}/reviews`, config.headers());
    }else{
        response = await fetch(`${config.api}/reviews`, config.headers());
    }
    
    if (!response.ok) {
        throw new Error('Failed to fetch menu: ' + response.statusText);
    }

    return await response.json();
}