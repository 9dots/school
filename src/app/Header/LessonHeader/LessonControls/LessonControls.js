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
  const [, classId, lessonId, current, uid] = path2Re.test(pathname)
    ? path2Re.exec(pathname)
    : path1Re.exec(pathname)
  const path = urlJoin('/class', classId, 'lesson', lessonId)

  const cur = parseInt(current, 10)
  const { tasks = [] } = lesson
  const isLast = tasks.length <= cur + 1

  return (
    <div className='lesson-controls'>
      <Link to={urlJoin(path, prev(), uid || '')} disabled={!cur}>
        <Icon type='left' size='large' />
      </Link>
      <span className='dots'>
        {tasks.map((val, key) => (
          <Link
            key={key}
            to={urlJoin(path, '' + key, uid || '')}
            className={`dot ${cur >= key ? 'active' : ''}`} />
        ))}
      </span>
      <Link to={urlJoin(path, next(), uid || '')}>
        <Button type='primary' className='secondary'>
          {isLast ? 'DONE' : 'NEXT'}
          <Icon type='right' />
        </Button>
      </Link>
    </div>
  )

  function prev () {
    return '' + Math.max(0, cur - 1)
  }
  function next () {
    return '' + Math.min(tasks.length, cur + 1)
  }
}

LessonControls.propTypes = {}

export default LessonControls
