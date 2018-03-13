import { Icon, Button } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'
import './LessonControls.less'

const LessonControls = ({ current, classId, lessonId, lesson }) => {
  const path = `/class/${classId}/lesson/${lessonId}/`
  const { tasks } = lesson
  const cur = parseInt(current, 10)
  const isLast = tasks.length <= cur + 1

  return (
    <div className='lesson-controls'>
      <Link to={path + prev()} disabled={!cur}>
        <Icon type='left' size='large' />
      </Link>
      <span className='dots'>
        {tasks.map((val, key) => (
          <Link
            key={key}
            to={path + key}
            className={`dot ${cur >= key ? 'active' : ''}`} />
        ))}
      </span>
      <Link to={path + next()}>
        <Button type='primary' className='secondary'>
          {isLast ? 'DONE' : 'NEXT'}
          <Icon type='right' />
        </Button>
      </Link>
    </div>
  )

  function prev () {
    return Math.max(0, cur - 1)
  }
  function next () {
    return Math.min(tasks.length, cur + 1)
  }
}

LessonControls.propTypes = {}

export default LessonControls
