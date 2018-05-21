import React, { createElement } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import getProp from '@f/get-prop'
import omit from '@f/omit'
import pick from '@f/pick'

import './Field.less'

const BaseComponent = props => {
  const {
    itemProps = {},
    touched = {},
    errors = {},
    component,
    noItem,
    label,
    name
  } = props

  return createElement(
    noItem ? 'div' : Form.Item,
    noItem
      ? {}
      : {
        // hasFeedback: !!getProp(name, touched) && !!getProp(name, errors),
        validateStatus:
            getProp(name, touched) && getProp(name, errors) && 'error',
        help: getProp(name, touched) && getProp(name, errors),
        label,
        ...itemProps
      },
    createElement(component, omit('component', props))
  )
}

BaseComponent.propTypes = {}

const TextField = props => {
  const {
    setFieldTouched,
    setFieldValue,
    handleSubmit,
    placeholder,
    values,
    name,
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
    setFieldTouched,
    setFieldValue,
    handleSubmit,
    placeholder,
    values,
    name,
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
    setFieldTouched,
    notFoundContent,
    setFieldValue,
    placeholder,
    children,
    options,
    values,
    name,
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
      value={getProp(name, values)}>
      {children ||
        options.map(({ label, value }, i) => (
          <Select.Option label={label} key={i} value={value}>
            {label}
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
  'noItem',
  'studentSignIn',
  'rpc',
  'setUrl',
  'confirmLoading',
  'isAuthenticating',
  'isAuthenticated',
  'staticContext',
  'dispatch',
  'redirectPath',
  'itemProps',
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

const inputProps = [
  'addonAfter',
  'addonBefore',
  'autosize',
  'defaultValue',
  'enterButton',
  'disabled',
  'id',
  'onPressEnter',
  'onSearch',
  'prefix',
  'size',
  'suffix',
  'type',
  'value'
]

const selectProps = [
  'allowClear',
  'autoFocus',
  'defaultActiveFirstOption',
  'defaultValue',
  'disabled',
  'dropdownClassName',
  'dropdownMatchSelectWidth',
  'dropdownStyle',
  'filterOption',
  'firstActiveValue',
  'getPopupContainer',
  'labelInValue',
  'maxTagCount',
  'maxTagPlaceholder',
  'mode',
  'notFoundContent',
  'optionFilterProp',
  'optionLabelProp',
  'placeholder',
  'showSearch',
  'showArrow',
  'size',
  'tokenSeparators',
  'value',
  'onBlur',
  'onChange',
  'onDeselect',
  'onFocus',
  'onInputKeyDown',
  'onMouseEnter',
  'onMouseLeave',
  'onPopupScroll',
  'onSearch',
  'onSelect'
]
