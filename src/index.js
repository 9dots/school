import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import createStore from 'configureStore'
import { Provider } from 'react-redux'
import Boot from 'components/Boot'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <Boot />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
