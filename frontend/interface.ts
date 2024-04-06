export interface RestaurantItem {
    _id: string,
    name: string,
    img: string,
    tel: string,
    street: string,
    locality: string,
    district: string,
    province: string,
    zipcode: string,
    closeDate: [number],
    open: string,
    close: string,
    owner: string,
}

export interface RestaurantJson {
    success: boolean,
    count: number,
    data: RestaurantItem[],
    averageRating: number,
}