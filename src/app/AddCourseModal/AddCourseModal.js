import { Modal, List, Icon, Button, Checkbox } from 'antd'
import SchoolDetails from '../School/SchoolDetails'
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
                  <List.Item key={id}>
                    <Field
                      meta={{ valid: false }}
                      component={checkField}
                      displayName={displayName}
                      school={school}
                      name={id} />
                  </List.Item>
                ))}
            </List>
          </div>
          {/* <Button className='new-school'>
            <Icon type='plus' /> Create New Class
          </Button> */}
        </form>
      </Modal>
    </span>
  )
}

const checkField = ({ input, displayName, meta, school }) => (
  <div className='input-row'>
    <Checkbox {...input} className='large'>
      <div>
        <div>{displayName}</div>
        <i>
          <SchoolDetails school={school} />
        </i>
      </div>
    </Checkbox>
    {meta.touched && meta.error && <span className='error'>{meta.error}</span>}
  </div>
)

AddCourseModal.propTypes = {}

export default enhancer(AddCourseModal)
