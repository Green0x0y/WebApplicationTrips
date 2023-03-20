export class Trip{
    public constructor(
        public key: any,
        public num: number,
        public name: string,
        public country: string,
        //public startDate: Date,
        //public endDate: Date,
        public price: number,
        public max: number,
        public description: string,
        public currentStars: number,
        public ratings: Array<number>,
        public chosen: number,
        public photo: string,
        public reviews: Array<{
            yourNick: any, 
            tripName: any, 
            date: any, 
            opinion: any, }>
    ){}
}