import { IEntity } from "../interfaces/ientity";
import { ContactUser } from "./contactUser";


export class Contact implements IEntity {
    id: number = 0;
    name: string = "";
    phoneNo: string = "";
    contactUsers: ContactUser[] = [];
    primaryUserName:string="";
    primaryUserId:number=0;

}