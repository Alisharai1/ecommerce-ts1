import { commonMetaData } from "./common.model"

export type ContactDetail = { street: string, city: string, state: string, pincode: string, phone: string, name: string, isPrimary: boolean } & commonMetaData


export type User = { name: string, email: string, contactDetails: ContactDetail[], type: UserType } & commonMetaData

export enum UserType {
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN"
}
