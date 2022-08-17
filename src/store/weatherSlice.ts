import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apiKey = 'c8f8bb0affc350e01b4829a6fc8d6041'

export type WeatherResponse = {
  list : Array<{dt: number, main: {temp: number}, weather: Array<{ main: string }> }>
  city: {id: number, name: string, country: string}
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getWeatherFor5Days: builder.query<WeatherResponse, {lat: number, lon: number}>({
      query: ({ lat, lon }) => `forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    }),
  }),
})

export const {
  useLazyGetWeatherFor5DaysQuery,
} = weatherApi