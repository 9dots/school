import { compose, withStateHandlers } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'
import './addLoading.less'

export default compose(
  withStateHandlers(
    { confirmLoading: false },
    {
      setLoading: ({ confirmLoading }) => value => ({ confirmLoading: value })
    }
  )
)
