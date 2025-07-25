import { CalendarEvent } from '@prisma/client'
import { Holiday } from '../types'
import { prisma } from './connection'

export function findUserCalendarEvents(userId: string) {
    return prisma.calendarEvent.findMany({
        where: {
            calendars: {
                some: {
                    userId,
                },
            },
        },
    })
}

export function createUserCalendarEvents(userId: string, holidays: Holiday[]) {
    return prisma.$transaction(async (transaction) => {
        const createdEvents: CalendarEvent[] = []

        for (const holiday of holidays) {
            const event = await transaction.calendarEvent.upsert({
                where: {
                    countryCode_name: {
                        countryCode: holiday.countryCode,
                        name: holiday.name,
                    },
                },
                update: {},
                create: {
                    countryCode: holiday.countryCode,
                    name: holiday.name,
                    date: new Date(holiday.date),
                },
            })

            await transaction.userCalendar.upsert({
                where: {
                    userId_calendarEventId: {
                        userId,
                        calendarEventId: event.id,
                    },
                },
                update: {},
                create: {
                    userId,
                    calendarEventId: event.id,
                },
            })

            createdEvents.push(event)
        }

        return createdEvents
    })
}
