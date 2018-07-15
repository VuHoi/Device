
import {image} from './image';
export class device{
    
    name:string;
    image :image;
    category:String[];
    location:string;
    quantity:number;
    detail:string;


    constructor(name:string, image :image,  category:String[], location:string, quantity:number, detail:string)
        {
                    this.name=name;
                    this.image=image;
                    this.category=category;
                    this.location=location;
                    this.quantity=quantity;
                    this.detail=detail;

        }

}