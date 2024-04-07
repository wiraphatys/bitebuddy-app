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
    averageRating: number,
}

export interface RestaurantJson {
    success: boolean,
    count: number,
    data: RestaurantItem[]
}

export interface RestaurantOwnerJson {
    success: boolean,
    data: RestaurantItem
}

export interface MenuItem {
    _id: string,
    name: string,
    img: string,
    description: string,
    restaurant: string,
}

export interface MenuJson {
    success: boolean,
    count: number,
    data: MenuItem[],
}