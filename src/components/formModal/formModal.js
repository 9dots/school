import { compose, withStateHandlers, withHandlers } from 'recompose'
import { reduxForm } from 'redux-form'
import React from 'react'
import './formModal.less'

const formModal = form => Component => {
  const formModalEnhancer = compose(
    reduxForm(form),
    withStateHandlers(
      { confirmLoading: false },
      {
        setLoading: ({ confirmLoading }) => value => ({ confirmLoading: value })
      }
    ),
    withHandlers({
      close: ({ destroy }) => handler => (...args) => {
        destroy()
        handler(...args)
      }
    })
  )
  return formModalEnhancer(props => <Component {...props} />)
}

export default formModal
