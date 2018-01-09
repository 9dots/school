import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import createStore from 'configureStore'
import { Provider } from 'react-redux'
import Router from 'app/Router'
import './index.less'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
