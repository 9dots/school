import { Link } from 'react-router-dom'
import toRegexp from 'path-to-regexp'
import { Icon, Button } from 'antd'
import PropTypes from 'prop-types'
import urlJoin from 'url-join'
import React from 'react'

import './LessonControls.less'

const path1Re = toRegexp('/class/:classId/lesson/:lessonId/:taskNum')
const path2Re = toRegexp('/class/:classId/lesson/:lessonId/:taskNum/:uid')

const LessonControls = ({ lesson, progress }) => {
  const { pathname } = window.location
  const [, classId, lessonId, current, uid = ''] = path2Re.test(pathname)
    ? path2Re.exec(pathname)
    : path1Re.exec(pathname)
  const path = urlJoin('/class', classId, 'lesson', lessonId)

  const cur = parseInt(current, 10)
  const isLast = progress.length <= cur + 1

  return (
    <div className='lesson-controls'>
      <Link to={prev()} disabled={!cur}>
        <Icon type='left' size='large' />
      </Link>
      <span className='dots'>
        {progress.map((val, key) => (
          <Link
            key={key}
            to={urlJoin(path, '' + key, uid)}
            className={getClasses(val)}>
            <span className='dot-index'>{key + 1}</span>
          </Link>
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
      : urlJoin(path, '' + Math.min(progress.length - 1, cur + 1), uid)
  }

  function getClasses ({ completed, active, started }) {
    let name = 'dot'
    if (completed) name += ' completed'
    if (started) name += ' started'
    if (active) name += ' active'
    return name
  }
}

LessonControls.propTypes = {}

export default LessonControls
