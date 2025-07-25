import { CountryFlagDTO, Holiday } from './types'


async function fetchApi<T = any>(url: string): Promise<T | undefined> {
    const response = await fetch(url)

    if (response.status === 404) {
        return undefined
    }

    return response.json()
}


async function fetchPost(url: string, body: object) {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...(body && { body: JSON.stringify(body) }),
    }

    const response = await fetch(url, options)

    if (response.status === 404) {
        return undefined
    }

    return response.json()
}


export async function fetchCountries() {
    return fetchApi('https://date.nager.at/api/v3/AvailableCountries')
}


export async function fetchCountryBorders(countryCode: string) {
    return fetchApi(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
}


export async function fetchCountryPopulation(countryCode: string) {
    return fetchPost('https://countriesnow.space/api/v0.1/countries/population', { iso3: countryCode })
        .then(res => res?.data)
}

export async function fetchCountryFlagImageUrl(countryCode: string) {
    return fetchApi('https://countriesnow.space/api/v0.1/countries/flag/images')
        .then(res => {
            if (!res) {
                return undefined
            }
            console.log('flag res', res)

            const country = res.data.find((c: CountryFlagDTO) => c.iso3 === countryCode)

            if (!country) {
                return undefined
            }

            return country.flag
        })
}

export async function fetchPublicHolidays(countryCode: string, year: number): Promise<Holiday[] | undefined> {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)

    if (response.status === 404 || response.status === 204) {
        return undefined
    }

    return response.json()
}

