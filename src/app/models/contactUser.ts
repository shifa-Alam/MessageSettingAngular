import { IEntity } from "../interfaces/ientity";


export class ContactUser implements IEntity {
    id: number = 0;
    contactId: number = 0;
    userId: number = 0;
    userType: number = 0;

}