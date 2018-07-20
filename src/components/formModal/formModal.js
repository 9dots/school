import { compose, withStateHandlers, withHandlers } from 'recompose'
import { withFormik } from 'formik'
import React from 'react'
import './formModal.less'

const formModal = form => Component => {
  const formModalEnhancer = compose(
    withStateHandlers(
      { confirmLoading: false },
      {
        setLoading: () => value => ({ confirmLoading: value })
      }
    ),
    withHandlers({
      close: ({ setLoading }) => handler => (...args) => {
        setLoading(false)
        handler(...args)
      }
    }),
    withFormik(form)
  )
  return formModalEnhancer(props => <Component {...props} />)
}

export default formModal
