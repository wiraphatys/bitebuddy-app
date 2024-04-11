export interface RestaurantItem {
    _id: string,
    name: string,
    img: string,
    description: string,
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

export interface ReservationItem{
    restaurant:{
        name:string,
        tel:string,
        street:string,
        locality:string,
        district:string,
        province:string,
        img:string
    },
    user:{
        email:string
    },
    datetime:string,
    _id:string,
    count:number
  }
  
  export interface ReservationListJSON {
    success: boolean,
    count: number,
    data: ReservationItem[]
  }
  
  export interface DeleteJSON {
    success: boolean;
    data: Object
  }

export interface UserItem {
    email: string,
    img: string,
}

export interface ReviewItem {
    _id: string,
    rating: number,
    comment: string,
    user: UserItem,
    restaurant: RestaurantItem,
}

export interface ReviewJson {
    success: boolean,
    count: number,
    data: ReviewItem[],
}
