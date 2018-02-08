import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../components/waitFor/waitFor'
import SchoolDetails from '../School/SchoolDetails'
import { allClasses, uid } from '../../selectors'
import { Modal, Form, Checkbox, List, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'

import './AddCourseModal.less'
import School from '../School/School'

const enhancer = compose(
  connect(state => ({
    uid: uid(state)
  })),
  firestoreConnect(props => [
    {
      collection: 'classes',
      where: [[`teachers.${props.uid}`, '==', true]],
      storeAs: `allClasses`
    }
  ]),
  connect(state => ({
    classes: allClasses(state)
  })),
  waitFor(props => ['classes'])
)

const AddCourseModal = props => {
  const { classes = [], isLoaded, schools, ...rest } = props
  return (
    <Modal className='add-course-modal' title='Add a Course' okText='Add' {...rest}>
      <Form>
        <p>Select classes to assign to:</p>
        <div
          className='scroller'
          style={{ minHeight: 150, maxHeight: 250, padding: '0 10px' }}>
          <List>
            {isLoaded &&
              classes.map(({ displayName, school }, key) => (
                <List.Item key={key}>
                  <Checkbox className='large'>
                    <div>
                      <div>{displayName}</div>
                      <i>
                        <SchoolDetails school={school} />
                      </i>
                    </div>
                  </Checkbox>
                </List.Item>
              ))}
          </List>
        </div>
        <Button className='new-school'>
          <Icon type='plus' /> Create New Class
        </Button>
      </Form>
    </Modal>
  )
}

AddCourseModal.propTypes = {}

export default enhancer(AddCourseModal)
