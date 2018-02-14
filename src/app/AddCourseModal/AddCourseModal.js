import SchoolDetails from '../School/SchoolDetails'
import { Modal, List, Icon, Button } from 'antd'
import { CheckboxField } from 'redux-form-antd'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './AddCourseModal.less'

const AddCourseModal = props => {
  const {
    confirmLoading,
    classes = [],
    isLoaded,
    modalId,
    schools,
    modal,
    onOk,
    id,
    ...rest
  } = props
  return (
    <span>
      <Modal
        onOk={props.handleSubmit(props.onSubmit)}
        confirmLoading={confirmLoading}
        className='add-course-modal'
        title='Add a Course'
        okText='Add'
        {...rest}>
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
          <p>Select classes to assign to:</p>
          <div
            className='scroller'
            style={{ minHeight: 150, maxHeight: 250, padding: '0 10px' }}>
            <List>
              {isLoaded &&
                classes.map(({ displayName, school, id }) => (
                  <Field
                    meta={{ valid: false }}
                    component={CheckboxField}
                    name={id}
                    key={id}>
                    <div>{displayName}</div>
                    <i>
                      <SchoolDetails school={school} />
                    </i>
                  </Field>
                ))}
            </List>
          </div>
          <Button className='new-school'>
            <Icon type='plus' /> Create New Class
          </Button>
        </form>
      </Modal>
    </span>
  )
}

AddCourseModal.propTypes = {}

export default enhancer(AddCourseModal)
