import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'

import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import allReducers from './redux/store.js'
import { createStore } from 'redux'
import SocketWrapper from './components/Socket/SocketWrapper.jsx'

const store = createStore(allReducers)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <SocketWrapper>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <App />
          <ToastContainer
            theme='colored'
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
            style={{ zIndex: 100000000 }}
          />
        </CssVarsProvider>
      </SocketWrapper>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)