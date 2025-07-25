import dotenv from 'dotenv'
import express from 'express'
import { logginMiddleware } from './middlewares'
import countriesRoutes from './routes/countries'
import usersRoutes from './routes/users'

dotenv.config()

const APP_PORT = process.env.APP_PORT

if (!APP_PORT) {
    throw new Error('Missing APP_PORT')
}


export const app = express()

app.use(logginMiddleware)

app.use(express.json())

app.use('/countries', countriesRoutes)
app.use('/users', usersRoutes)


app.listen(APP_PORT, (error) => {
    if (error) {
        console.error('Error staring server', error)
        return
    }

    console.log('Server started on port', APP_PORT)
})