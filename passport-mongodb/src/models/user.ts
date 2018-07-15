import {image} from './image';
export class user{
    id:string;
    username:string;
    password:string;
    email:string;
    department:string;
    hometown:string;
    identity_number:string;
    image:image;
    role:string;
    devices : [{
        name:string;
        image:image;
        borrowed_day:string;
        enpired_day:string;
    }]
}