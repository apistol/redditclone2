import '../styles/tailwind.css'
import {AppProps} from 'next/app'
import React from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true
 
function App({ Component, pageProps }:AppProps)   {
  return <Component {...pageProps} />
}

export default App
