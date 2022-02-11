import { IEntity } from "../interfaces/ientity";


export class Employee implements IEntity {
    id: number = 0;
    firstName: string = "";
    lastName: string = "";
    dateOfBirth: any;
    phoneNumber: string = "";
    email: string = "";

}