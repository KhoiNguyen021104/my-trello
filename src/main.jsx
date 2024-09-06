import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import allReducers from './redux/store.js'
import { createStore } from 'redux'
// import React from 'react'

const store = createStore(allReducers)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
        <ToastContainer
          theme='colored'
        />
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)