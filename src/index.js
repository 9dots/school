import registerServiceWorker from './registerServiceWorker'
import createStore, { history } from 'configureStore'
import Router from 'react-router-dom/Router'
import { Provider } from 'react-redux'
import { routes } from 'app/Router'
import ReactDOM from 'react-dom'
import React from 'react'
import './index.less'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
