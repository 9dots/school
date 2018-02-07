import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../components/waitFor/waitFor'
import SchoolDetails from '../School/SchoolDetails'
import { allClasses, uid } from '../../selectors'
import { Modal, Form, Checkbox } from 'antd'
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
    classes: allClasses(state),
    schools: (allClasses(state) || []).map(cls => cls.school)
  })),
  waitFor(props => ['classes', ...props.schools])
)

const AddCourseModal = props => {
  const { classes = [], isLoaded, schools, ...rest } = props
  return (
    <Modal className='add-course-modal' title='Add a Course' {...rest}>
      <Form>
        <div className='scroller' style={{ height: 100 }}>
          {isLoaded &&
            classes.map(({ displayName, school }, key) => (
              <div
                key={key}
                style={{ padding: 10, borderBottom: '1px solid #eee' }}>
                <Checkbox>
                  {displayName}
                  <SchoolDetails school={school} />
                </Checkbox>
              </div>
            ))}
        </div>
      </Form>
    </Modal>
  )
}

AddCourseModal.propTypes = {}

export default enhancer(AddCourseModal)
