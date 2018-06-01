import { firestoreConnect } from 'react-redux-firebase'
import waitFor from 'components/waitFor'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { course } from 'selectors'
import PropTypes from 'prop-types'
import Course from '../Course'
import { Icon, Layout } from 'antd'
import React from 'react'

import './CourseView.less'

const enhancer = compose(
  connect((state, { match: { params: { courseId } } }) => {
    const search = new window.URLSearchParams(window.location.search)
    return {
      courseId,
      context: search.get('redirect')
    }
  }),
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

const CourseView = ({ context, courseId, course, header = true }) => {
  const BackBtn = () => (
    <h2>
      <Link to={`/${context || 'courses'}`}>
        <Icon type='left' /> Back to{' '}
        <span style={{ textTransform: 'capitalize' }}>
          {context || 'Courses'}
        </span>
      </Link>
    </h2>
  )

  return (
    <Layout>
      {header && (
        <Layout.Header>
          <BackBtn />
        </Layout.Header>
      )}
      <div
        className='course-view main-col'
        style={{ padding: '30px 50px 50px', width: '100%' }}>
        {!header && <BackBtn />}
        {course && (
          <Course progress={{}} course={{ id: courseId, ...course }} />
        )}
      </div>
    </Layout>
  )
}

CourseView.propTypes = {}

export default enhancer(CourseView)
