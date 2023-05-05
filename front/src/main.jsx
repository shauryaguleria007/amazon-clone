import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import "./index.css"
import { App } from './App.jsx'
import { store } from './store/store.js'
import { GlobalContextProvider } from './context/globalContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </Provider>
)
