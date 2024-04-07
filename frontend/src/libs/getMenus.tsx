import config from "@/utils/config";

export default async function getMenu(id:string) {

    await new Promise((resolve)=>setTimeout(resolve,1000))
    const response = await fetch(`${config.api}/restaurants/${id}/menus`);

    if (!response.ok) {
        throw new Error('Failed to fetch menu: ' + response.statusText);
    }

    return await response.json();
}