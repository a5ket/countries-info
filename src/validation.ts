import { z, ZodError } from 'zod'
import { CreateUserHolidaysDTO } from './types'


export const isValidationError = (error: any) => error instanceof ZodError


const holidayValidator = z.string().trim().min(1)


const eventSchema = z.object({
    countryCode: z.string().trim().min(2).max(3),
    year: z.int().nonnegative(),
    holidays: z.array(holidayValidator)
})

export function validateCreateUserHolidays(data: CreateUserHolidaysDTO) {
    return eventSchema.parse(data)
}
