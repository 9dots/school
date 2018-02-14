import PropTypes from 'prop-types'
import React from 'react'
import Course from '../Course'
import './CourseView.less'

import styles from 'theme/vars/vars.js'

const CourseView = props => {
  return (
    <div
      className='course-view main-col'
      style={{ maxWidth: '980px', padding: '30px 50px 50px' }}>
      <Course />
    </div>
  )
}

CourseView.propTypes = {}

export default CourseView
