import PropTypes from 'prop-types'
import React from 'react'
import Course from '../Course'
import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../components/waitFor/waitFor'
import { course } from '../../selectors'
import { connect } from 'react-redux'
import { compose } from 'recompose'
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
    <div
      className='course-view main-col'
      style={{ maxWidth: '980px', padding: '30px 50px 50px' }}>
      {props.course && <Course course={props.course} />}
    </div>
  )
}

CourseView.propTypes = {}

export default enhancer(CourseView)
