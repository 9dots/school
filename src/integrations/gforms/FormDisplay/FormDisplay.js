import * as Components from './components'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import pick from '@f/pick'
import React from 'react'
import data from './test'

import './FormDisplay.less'
import { Button } from 'antd'

const FormDisplay = props => {
  const { fields, title, desc, askEmail, emailAddress } = data
  const formProps = pick(fieldFormProps, props)
  return (
    <form style={{ width: '50%', margin: '0 auto' }}>
      {title && <Components.Title title={title} desc={desc} />}
      {askEmail && (
        <Components.Email formProps={formProps} emailAddress={emailAddress} />
      )}
      {fields.map(field => (
        <Components.Field formProps={formProps} key={field.id} field={field} />
      ))}
      <Button onClick={props.handleSubmit}>Submit</Button>
    </form>
  )
}

FormDisplay.propTypes = {}

export default enhancer(FormDisplay)

const fieldFormProps = [
  'setFieldTouched',
  'setFieldValue',
  'handleSubmit',
  'errors',
  'touched',
  'values'
]
