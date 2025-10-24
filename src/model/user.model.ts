import { object, string, number } from "yup"
import { commonMetaData } from "./common.model"

export type ContactDetail = { street: string, city: string, state: string, pincode: string, phone: string, name: string, isPrimary: boolean } & commonMetaData


export type User = { name: string, email: string, contactDetails: ContactDetail[], type: UserType } & commonMetaData

export enum UserType {
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN"
}
export const addContactDetailSchema = object({
    street: string().required(),
    city: string().required(),
    state: string().required(),
    pincode: string().required(),
    phone: string().required()
})

export const addUserRequestBodySchema = object({
    name: string().required('name is required'),
    email: string().required().email(),
    contactDetail: addContactDetailSchema.required()
})
export const getUsersQuerySchema = object({
    page: number().optional().integer().positive()
})

export const getUserByIdParamsSchema = object({
    id: string().required().uuid()
})

export const deleteUserParamsSchema = getUserByIdParamsSchema

export const updateUserParamsSchema = getUserByIdParamsSchema

export const updateUserNameRequestBodySchema = object({
    name: string().required()
})

export const getContactDetailsByUserIdParamsSchema = object({
    userId: string().required().uuid()
})
export const getContactDetailsByUserIdWithPaginationQuerySchema = object({
    page: number().integer().positive().optional()
})

export const deleteContactIdByUserIdParamsSchema = object({
    id: string().required().uuid(),
    userId: string().required().uuid()
})

export const getContactDetailsByIdParamsSchema = deleteContactIdByUserIdParamsSchema

export const updateContactDetailsByIdRequestBodySchema = addContactDetailSchema

export const updateContactDetailsByIdParamsSchema = deleteContactIdByUserIdParamsSchema

