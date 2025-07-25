import express from 'express'
import { fetchCountries, fetchCountryBorders, fetchCountryFlagImageUrl, fetchCountryPopulation } from '../api'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const data = await fetchCountries()

        return res.json({ data })
    } catch (error) {
        console.error('Failed to fetch countries', error)

        return res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode.toUpperCase()

    try {
        const [borders, population, flagUrl] = await Promise.all([
            fetchCountryBorders(countryCode),
            fetchCountryPopulation(countryCode),
            fetchCountryFlagImageUrl(countryCode),
        ])

        if (!borders || !population || !flagUrl) {
            return res.status(404).json({ error: 'Country not found' })
        }

        return res.json({
            data: {
                borders,
                population,
                flagUrl,
            },
        })
    } catch (error) {
        console.error('Failed to fetch country info', error)

        return res.status(500).json({ error: 'Internal server error' })
    }
})

export default router
