import { ValidationError } from "yup"
import { addContactDetailSchema, addUserRequestBodySchema, getUserByIdParamsSchema, getUsersQuerySchema } from "../../src/model"
import { randomUUID } from "crypto"

describe("user.model", () => {
    describe("addContactDetailSchema", () => {
        test("should validate contact details suucessfully", () => {
            const input = {
                street: "AC",
                city: "Kol",
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            const output = addContactDetailSchema.validateSync(input, { abortEarly: false, strict: true })
            expect(output).toEqual(input)
        })

        test("should throw error when city is missing", () => {
            const input = {
                street: "AC",
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            try {
                addContactDetailSchema.validateSync(input, { abortEarly: false, strict: true })
            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error).toBeInstanceOf(ValidationError)
                    expect(error.errors).toEqual(['city is a required field'])

                }
            }
        })

        test("should throw error when city is non-string", () => {
            const input = {
                street: "AC",
                city: 12345,
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            try {
                addContactDetailSchema.validateSync(input, { abortEarly: false, strict: true })

            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error).toBeInstanceOf(ValidationError)
                    expect(error.errors).toEqual(["city must be a `string` type, but the final value was: `12345`."])
                }
            }
        })

        test("should throw error when street is missing", () => {
            const input = {
                city: "Kol",
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            try {
                addContactDetailSchema.validateSync(input, { abortEarly: false, strict: true })
            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error).toBeInstanceOf(ValidationError)
                    expect(error.errors).toEqual(["street is a required field"])
                }
            }
        })

        test("should throw error when street is non-string", () => {
            const input = {
                street: 237890,
                city: "Kol",
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            try {
                addContactDetailSchema.validateSync(input, { abortEarly: false, strict: true })

            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error).toBeInstanceOf(ValidationError)
                    expect(error.errors).toEqual(["street must be a `string` type, but the final value was: `237890`."])
                }
            }
        })

        test(" should throw error when state is missing", () => {
            const input = {
                street: "AC",
                city: "Kol",
                pincode: "K101",
                phone: "1234"
            }
            try {
                addContactDetailSchema.validateSync(input, { abortEarly: false, strict: true })
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationError)
                if (error instanceof ValidationError) {
                    expect(error.errors).toEqual(["state is a required field"])
                }
            }
        })

        test("should throw error when state is non string", () => {
            const input = {
                street: "AC",
                city: "Kol",
                state: 890,
                pincode: "K101",
                phone: "1234"
            }
            try {
                addContactDetailSchema.validateSync(input, { abortEarly: false, strict: true })
            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error).toBeInstanceOf(ValidationError)
                    expect(error.errors).toEqual(["state must be a `string` type, but the final value was: `890`."])
                }
            }
        })

        test("should throw error when input is empty object", () => {
            const input = {}
            try {
                addContactDetailSchema.validateSync(input, { abortEarly: false, strict: true })
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationError)
                if (error instanceof ValidationError) {
                    expect(error.errors).toEqual(["street is a required field",
                        "city is a required field",
                        "state is a required field",
                        "pincode is a required field",
                        "phone is a required field"])
                }
            }
        })
    })

    describe("addUserRequestBodySchema", () => {
        test("should validate add user request body successfuly", () => {
            const input = {
                name: "Alisha",
                email: "a@gmail.com",
                contactDetail: {
                    street: "AC",
                    city: "Kol",
                    state: "WB",
                    pincode: "K101",
                    phone: "1234"
                }
            }
            const output = addUserRequestBodySchema.validateSync(input, { abortEarly: false, strict: true })
            expect(output).toEqual(input)
        })

        test("should throw error if any field is missing in add user request body", () => {
            const input = {
                name: "Alisha",
                contactDetail: {
                    street: "AC",
                    city: "Kol",
                    state: "WB",
                    pincode: "K101",
                    phone: "1234"
                }
            }
            try {
                addUserRequestBodySchema.validateSync(input, { abortEarly: false, strict: true })
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationError)
                if (error instanceof ValidationError) {
                    expect(error.errors).toEqual(["email is a required field"])
                }
            }
        })

        test("should throw error when any field is missing from contact details object", async () => {
            const input = {
                name: "Alisha",
                email: "a@gmail.com",
                contactDetail: {
                    street: "AC",
                    city: "Kol",
                    pincode: "K101",
                    phone: "1234"
                }
            }
            try {
                await addUserRequestBodySchema.validate(input, { abortEarly: false, strict: true, recursive: true })
            } catch (error) {
                console.log(error);

                expect(error).toBeInstanceOf(ValidationError)
                if (error instanceof ValidationError) {
                    expect(error.errors).toEqual(["contactDetail.state is a required field"])
                }
            }
        })
    })

    describe("getUserByIdParamsSchema,deleteUserParamsSchema,updateUserParamsSchema", () => {
        test("should validate user by user id successfully", () => {
            const id = randomUUID()
            const output = getUserByIdParamsSchema.validateSync({ id }, { abortEarly: false, strict: true, recursive: true })
            expect(output).toEqual({ id })
        })

        test("should throw error when user id is not uuid", () => {
            const id = "1234"
            try {
                getUserByIdParamsSchema.validateSync({ id }, { abortEarly: false, strict: true, recursive: true })

            } catch (error) {
                expect(error).toBeInstanceOf(ValidationError)
                if (error instanceof ValidationError) {
                    expect(error.errors).toEqual(["id must be a valid UUID"])
                }
            }
        })
    })
})
