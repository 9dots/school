import { Link } from 'react-router-dom'
import toRegexp from 'path-to-regexp'
import { Icon, Button } from 'antd'
import PropTypes from 'prop-types'
import urlJoin from 'url-join'
import React from 'react'

import './LessonControls.less'

const path1Re = toRegexp('/class/:classId/lesson/:lessonId/:taskNum')
const path2Re = toRegexp('/class/:classId/lesson/:lessonId/:taskNum/:uid')

const LessonControls = ({ lesson }) => {
  const { pathname } = window.location
  const [, classId, lessonId, current, uid = ''] = path2Re.test(pathname)
    ? path2Re.exec(pathname)
    : path1Re.exec(pathname)
  const path = urlJoin('/class', classId, 'lesson', lessonId)

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
          <Link
            key={key}
            to={urlJoin(path, '' + key, uid)}
            className={getDotClasses(key)} />
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
    return urlJoin(path, '' + Math.max(0, cur - 1), uid)
  }
  function next () {
    return isLast
      ? `/class/${classId}/`
      : urlJoin(path, '' + Math.min(tasks.length - 1, cur + 1), uid)
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
