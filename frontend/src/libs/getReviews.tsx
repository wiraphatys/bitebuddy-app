import config from "@/utils/config";

export default async function getReviews(id:string) {

    await new Promise((resolve)=>setTimeout(resolve,1000))
    const response = await fetch(`${config.api}/restaurants/${id}/reviews`, config.headers());

    if (!response.ok) {
        throw new Error('Failed to fetch review: ' + response.statusText);
    }

    return await response.json();
}