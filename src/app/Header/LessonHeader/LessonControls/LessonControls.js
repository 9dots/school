import { Icon, Button } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'
import './LessonControls.less'

const LessonControls = ({ current, classId, lessonId, lesson }) => {
  const path = `/class/${classId}/lesson/${lessonId}/`
  const cur = parseInt(current, 10)
  const { tasks = [] } = lesson
  const isLast = tasks.length <= cur + 1

  return (
    <div className='lesson-controls'>
      <Link to={prev()} disabled={!cur}>
        <Icon type='left' size='large' />
      </Link>
      <span className='dots'>
        {tasks.map((val, key) => (
          <Link key={key} to={path + key} className={getDotClasses(key)} />
        ))}
      </span>
      <Link to={next()}>
        <Button type='primary' className='secondary'>
          {isLast ? 'DONE' : 'NEXT'}
          <Icon type='right' />
        </Button>
      </Link>
    </div>
  )

  function prev () {
    return path + Math.max(0, cur - 1)
  }
  function next () {
    return isLast
      ? `/class/${classId}/`
      : path + Math.min(tasks.length - 1, cur + 1)
  }

  function getDotClasses (i) {
    let classes = 'dot '
    if (cur === i) classes += 'current '
    if (cur >= i) classes += 'active '

    return classes
  }
}

LessonControls.propTypes = {}

export default LessonControls
