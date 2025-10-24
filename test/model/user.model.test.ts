import { ValidationError } from "yup"
import { addContactDetailSchema } from "../../src/model"
describe("user.model", () => {
    describe("addContactDetailSchema", () => {
        test("should validate contact details suucessfully", async () => {
            const input = {
                street: "AC",
                city: "Kol",
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            const output = await addContactDetailSchema.validate(input, { abortEarly: false, strict: true })
            expect(output).toEqual(input)
        })

        test("should throw error when city is missing", async () => {
            const input = {
                street: "AC",
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            try {
                await addContactDetailSchema.validate(input, { abortEarly: false, strict: true })
            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error).toBeInstanceOf(ValidationError)
                    expect(error.errors).toEqual(['city is a required field'])

                }
            }
        })

        test("should throw error when city is non-string", async () => {
            const input = {
                street: "AC",
                city: 12345,
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            try {
                await addContactDetailSchema.validate(input, { abortEarly: false, strict: true })

            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error).toBeInstanceOf(ValidationError)
                    expect(error.errors).toEqual(["city must be a `string` type, but the final value was: `12345`."])
                }
            }
        })

        test("should throw error when street is missing", async () => {
            const input = {
                city: "Kol",
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            try {
                await addContactDetailSchema.validate(input, { abortEarly: false, strict: true })
            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error.errors).toEqual(["street is a required field"])
                }
            }
        })

        test("should throw error when street is non-string", async () => {
            const input = {
                street: 237890,
                city: "Kol",
                state: "WB",
                pincode: "K101",
                phone: "1234"
            }
            try {
                await addContactDetailSchema.validate(input, { abortEarly: false, strict: true })

            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error.errors).toEqual(["street must be a `string` type, but the final value was: `237890`."])
                }
            }
        })

        test(" should throw error when state is missing", async () => {
            const input = {
                street: "AC",
                city: "Kol",
                pincode: "K101",
                phone: "1234"
            }
            try {
                await addContactDetailSchema.validate(input, { abortEarly: false, strict: true })
            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error.errors).toEqual(["state is a required field"])
                }
            }
        })

        test("should throw error when state is non string", async () => {
            const input = {
                street: "AC",
                city: "Kol",
                state: 890,
                pincode: "K101",
                phone: "1234"
            }
            try {
                await addContactDetailSchema.validate(input, { abortEarly: false, strict: true })
            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error.errors).toEqual(["state must be a `string` type, but the final value was: `890`."])
                }
            }
        })

        test("should throw error when input is empty object", async () => {
            const input = {}
            try {
                await addContactDetailSchema.validate(input, { abortEarly: false, strict: true })
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
})




