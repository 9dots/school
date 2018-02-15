import BrowserRouter from 'react-router-dom/BrowserRouter'
import registerServiceWorker from './registerServiceWorker'
import createStore from 'configureStore'
import { Provider } from 'react-redux'
import { routes } from 'app/Router'
import ReactDOM from 'react-dom'
import React from 'react'
import './index.less'

const store = createStore()

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>{routes}</BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
