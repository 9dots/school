import { Modal, List, Checkbox } from 'antd'
import SchoolDetails from '../School/SchoolDetails'
import Field from 'components/Field'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './AddCourseModal.less'

const AddCourseModal = props => {
  const {
    confirmLoading,
    classes = [],
    displayName,
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
        onOk={props.handleSubmit}
        confirmLoading={confirmLoading}
        className='add-course-modal'
        title='Add a Course'
        okText='Add'
        {...rest}>
        <form onSubmit={props.handleSubmit}>
          <p>
            Select classes to assign <b>&quot;{displayName}&quot;</b> to:
          </p>
          <div
            className='scroller'
            style={{ minHeight: 150, maxHeight: 250, padding: '0 10px' }}>
            <List>
              {isLoaded &&
                classes.map(({ displayName, school, id }) => (
                  <List.Item key={id}>
                    <Field
                      {...props}
                      noItem
                      component={checkField}
                      displayName={displayName}
                      school={school}
                      name={id} />
                  </List.Item>
                ))}
            </List>
          </div>
        </form>
      </Modal>
    </span>
  )
}

const checkField = ({ displayName, setFieldValue, school, name }) => (
  <div className='input-row'>
    <Checkbox
      onChange={e => setFieldValue(name, e.target.checked)}
      className='large'>
      <div>
        <div>{displayName}</div>
        <i>
          <SchoolDetails school={school} />
        </i>
      </div>
    </Checkbox>
  </div>
)

AddCourseModal.propTypes = {}

export default enhancer(AddCourseModal)
