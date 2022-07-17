import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { eventsApi } from './eventsSlice'
import { calendarSlice } from './calendarSlice'

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(eventsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//
// e=JSON.parse(document.body.textContent.trim());window.json=e;var t=document.createElement("div");t.setAttribute("id","root");var r=document.createElement("div");if(r.setAttribute("id","snackbar"),document.body.innerHTML="",document.body.appendChild(t),document.body.appendChild(r),chrome.runtime){var u=chrome.runtime.getURL("/styles.css"),d=document.createElement("link");d.setAttribute("rel","stylesheet"),d.setAttribute("href",u),document.head.append(d)}o.render(n.createElement(i.AppContainer,null),document.getElementById("root"))}catch(a){console.log(a)}};
// },{"react":"n8MK","react-dom":"NKHc","./Containers/AppContainer":"Ezp8"}]},{},["KNwJ"], null)
