import { Icon, Button } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'
import './LessonControls.less'

const LessonControls = ({ current, classId, lessonId }) => {
  const tasks = [1, 2, 3, 4, 5]
  const path = `/class/${classId}/lesson/${lessonId}/`
  const cur = parseInt(current, 10)

  return (
    <div className='lesson-controls'>
      <Link to={path + Math.max(0, cur - 1)}>
        <Icon type='left' size='large' />
      </Link>
      <span className='dots'>
        {tasks.map((val, key) => (
          <Link
            key={key}
            to={path + key}
            className={`dot ${parseInt(current, 10) >= key ? 'active' : ''}`} />
        ))}
      </span>
      <Link to={path + Math.min(tasks.length - 1, cur + 1)}>
        <Button type='primary' className='secondary'>
          NEXT
          <Icon type='right' />
        </Button>
      </Link>
    </div>
  )
}

LessonControls.propTypes = {}

export default LessonControls
