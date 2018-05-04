import React, { createElement } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import getProp from '@f/get-prop'
import omit from '@f/omit'

import './Field.less'

const BaseComponent = props => {
  const { errors = {}, touched = {}, component, name, noItem } = props
  return createElement(
    noItem ? 'div' : Form.Item,
    noItem
      ? {}
      : {
        hasFeedback: !!getProp(name, touched) && !!getProp(name, errors),
        validateStatus:
            getProp(name, touched) && getProp(name, errors) && 'error',
        help: getProp(name, touched) && getProp(name, errors)
      },
    createElement(component, omit('component', props))
  )
}

BaseComponent.propTypes = {}

const TextField = props => {
  const {
    placeholder,
    name,
    values,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    ...rest
  } = props
  return (
    <Input
      {...omit(formProps, rest)}
      placeholder={placeholder}
      value={getProp(name, values)}
      onChange={event => setFieldValue(name, event.target.value, true)}
      onBlur={() => setFieldTouched(name, true, true)}
      onPressEnter={handleSubmit} />
  )
}

const TextAreaField = props => {
  const {
    placeholder,
    name,
    values,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    ...rest
  } = props
  return (
    <Input.TextArea
      {...omit(formProps, rest)}
      placeholder={placeholder}
      value={getProp(name, values)}
      onChange={event => setFieldValue(name, event.target.value, true)}
      onBlur={() => setFieldTouched(name, true, true)} />
  )
}

const SelectField = props => {
  const {
    placeholder,
    options,
    name,
    values,
    setFieldValue,
    setFieldTouched,
    notFoundContent,
    mode,
    ...rest
  } = props
  return (
    <Select
      {...omit(formProps, rest)}
      mode={mode}
      onChange={value => setFieldValue(name, value)}
      onBlur={() => setFieldTouched(name, true, true)}
      notFoundContent={notFoundContent}
      options={options}
      placeholder={placeholder}
      value={getProp(name, values) || undefined}>
      {options.map((opt, i) => (
        <Select.Option label={opt.label} key={i} value={opt.value}>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default BaseComponent
export { TextField, SelectField, TextAreaField }

const formProps = [
  'editing',
  'visible',
  'class',
  'onOk',
  'onCancel',
  'edit',
  'courseId',
  'rpc',
  'setUrl',
  'confirmLoading',
  'isAuthenticating',
  'isAuthenticated',
  'staticContext',
  'dispatch',
  'redirectPath',
  'setLoading',
  'close',
  'errors',
  'touched',
  'isSubmitting',
  'resetForm',
  'submitForm',
  'validateForm',
  'setError',
  'setErrors',
  'setFieldError',
  'setStatus',
  'setSubmitting',
  'setTouched',
  'setValues',
  'setFormikState',
  'dirty',
  'isValid',
  'initialValues',
  'handleBlur',
  'handleChange',
  'handleReset',
  'validateOnChange',
  'validateOnBlur'
]
