export interface CountryPopulationDTO {
    iso3: string
    populationCounts: {
        year: number
        value: number
    }
}


export interface CountryFlagDTO {
    iso3: string
    flag: string
}


export interface Holiday {
    name: string
    countryCode: string
    date: Date
}


export interface CreateUserHolidaysDTO {
    countryCode: string
    year: number
    holidays: string[]
}