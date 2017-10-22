export interface IProduct {
    id: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    // tags: string[];
}

export class Product implements IProduct {
    constructor(public id: number,
        public productName: string,
        public productCode: string,
        public releaseDate: string,
        public price: number,
        public description: string,
        public starRating: number,
        public imageUrl: string,
        public tags: string[]) {}

    calculateDiscount(percent: number) {
        return this.price - (this.price * percent / 100);
    }
}
