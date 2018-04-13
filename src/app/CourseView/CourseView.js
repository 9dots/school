import { firestoreConnect } from 'react-redux-firebase'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { course } from 'selectors'
import PropTypes from 'prop-types'
import Course from '../Course'
import React from 'react'

import './CourseView.less'

const enhancer = compose(
  connect((state, { match: { params: { courseId } } }) => ({
    courseId
  })),
  firestoreConnect(props => [
    {
      collection: 'courses',
      doc: props.courseId,
      storeAs: props.courseId
    }
  ]),
  connect((state, props) => ({ course: course(state, props.courseId) })),
  waitFor(['course'])
)

const CourseView = props => {
  return (
    <div className='course-view main-col' style={{ padding: '30px 50px 50px' }}>
      {props.course && (
        <Course
          progress={{}}
          course={{ id: props.courseId, ...props.course }} />
      )}
    </div>
  )
}

CourseView.propTypes = {}

export default enhancer(CourseView)
