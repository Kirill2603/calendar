import React from 'react'
import { Navigate } from './components/Navigate'
import { Calendar } from './components/Calendar'
import { createGlobalStyle } from 'styled-components'
import { useAppDispatch, useAppSelector } from './store/store'
import { setActiveDate } from './store/calendarSlice'

const CSSReset = createGlobalStyle`
  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
  }

  body {
    line-height: 1;
  }

  article,aside,details,figcaption,figure,
  footer,header,hgroup,menu,nav,section {
    display: block;
  }

  nav ul {
    list-style :none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  a {
    margin: 0;
    padding: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input, select {
    vertical-align :middle;
  }
`
const GlobalStyle = createGlobalStyle`
  * {
    font-family: Dialog, sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box
  }

  #root {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
`

export const App = () => {

  const dispatch = useAppDispatch()
  const { activeDate } = useAppSelector(state => state.calendar)

  const startOfWeek = activeDate.clone().startOf('month').startOf('week')

  const onSetMonth = (type: 'next' | 'prev' | 'today') => {
    dispatch(setActiveDate({ type }))
  }

  return (
    <>
      <GlobalStyle />
      <CSSReset />
      <Navigate
        today={activeDate}
        onSetMonth={onSetMonth}
      />
      <Calendar
        activeDate={activeDate}
        startOfWeek={startOfWeek}
      />
    </>
  )
}
