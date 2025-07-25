import express from 'express'
import { fetchPublicHolidays } from '../api'
import { createUserCalendarEvents, findUserCalendarEvents } from '../db/events'
import { createUser, findUser } from '../db/users'
import { CreateUserHolidaysDTO, Holiday } from '../types'
import { isValidationError, validateCreateUserHolidays } from '../validation'


const router = express.Router()


router.get('/:userId/calendar/holidays', async (req, res) => {
    const userId = req.params.userId
    const events = await findUserCalendarEvents(userId)

    return res.json({ data: events })
})


router.post('/:userId/calendar/holidays', async (req, res) => {
    const userId = req.params.userId
    let user = await findUser(userId)

    if (!user) {
        user = await createUser(userId)
    }

    let data: CreateUserHolidaysDTO

    try {
        data = validateCreateUserHolidays(req.body)
    } catch (error) {
        console.error('Error validating user holidays', error)
        return res.status(422).json({ error: 'Invalid data', details: isValidationError(error) ? error.issues : undefined })
    }

    let availableHolidays: Holiday[] | undefined

    try {
        availableHolidays = await fetchPublicHolidays(data.countryCode, data.year)
    } catch (error) {
        console.error('Error fetching available holidays', error)
        return res.status(500).json({ error: 'Internal server error' })
    }


    if (!availableHolidays) {
        return res.status(404).json({ error: 'Country not found' })
    }

    const holidaysToCreate = data.holidays ? availableHolidays.filter(holiday => data.holidays.includes(holiday.name)) : availableHolidays
    try {
        const createdEvents = await createUserCalendarEvents(userId, holidaysToCreate)

        return res.json({ data: createdEvents })
    } catch (error) {
        console.error('Error creating events', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})


export default router