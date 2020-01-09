export interface Product {
    _id?: string;
    proname: string;
    price: number;
    picture: string;
    category: {
        _id?: string;
        name: string;
    }

}