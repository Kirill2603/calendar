import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { eventsApi } from './eventsSlice'
import { calendarSlice } from './calendarSlice'
import { weatherApi } from './weatherSlice'

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(eventsApi.middleware).concat(weatherApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
