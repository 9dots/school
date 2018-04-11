import registerServiceWorker from './registerServiceWorker'
import createStore, { history } from 'configureStore'
import Router from 'react-router-dom/Router'
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
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
