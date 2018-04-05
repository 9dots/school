import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import React from 'react'
import './Field.less'

const requiredProps = {
  validate: v => (v ? (v.trim() ? '' : 'Required') : 'Required')
}

const EnhancedField = props => {
  return <Field {...props} {...(props.required ? requiredProps : {})} />
}

EnhancedField.propTypes = {}

export default EnhancedField
