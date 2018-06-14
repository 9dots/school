import FormField, { TextField } from 'components/Field'
import PropTypes from 'prop-types'
import React from 'react'
import './Email.less'

const Email = props => {
  const { formProps } = props
  return (
    <FormField
      {...formProps}
      id='emailAddress'
      name='emailAddress'
      label='Email'
      required
      component={TextField} />
  )
}

Email.propTypes = {
  emailAddress: PropTypes.string
}

export { Email }
