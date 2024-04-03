export default async function getRestaurants() {    
    const response = await fetch("http://localhost:4000/api/v1/restaurants")
    if (!response.ok) {
        throw new Error("Failed to fetch restaurants")
    }
    return await response.json()
}


