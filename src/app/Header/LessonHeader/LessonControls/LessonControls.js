import TaskDot from 'components/TaskDot'
import { Link } from 'react-router-dom'
import toRegexp from 'path-to-regexp'
import { Icon, Button } from 'antd'
import PropTypes from 'prop-types'
import urlJoin from 'url-join'
import React from 'react'

import './LessonControls.less'

const path1Re = toRegexp(
  '/class/:classId/module/:moduleId/lesson/:lessonId/:taskNum'
)
const path2Re = toRegexp(
  '/class/:classId/module/:moduleId/lesson/:lessonId/:taskNum/:uid'
)

const LessonControls = ({ tasks, lesson, progress, studentId }) => {
  const { pathname } = window.location
  const [, classId, moduleId, lessonId, current, uid = ''] = path2Re.test(
    pathname
  )
    ? path2Re.exec(pathname)
    : path1Re.exec(pathname)
  const path = urlJoin(
    '/class',
    classId,
    'module',
    moduleId,
    'lesson',
    lessonId
  )
  const cur = parseInt(current, 10)
  const isLast = progress.length <= cur + 1

  return (
    <div className='lesson-controls'>
      <Link to={prev()} disabled={!cur}>
        <Icon type='left' size='large' />
      </Link>
      <span className='dots'>
        {tasks.map((val, i) => (
          <span key={i} className='dot-wrap'>
            <Link to={urlJoin(path, '' + i, uid)}>
              <TaskDot
                tasks={tasks}
                task={Object.assign(val, progress[i])}
                theme='dark'
                multiple
                number={i + 1} />
            </Link>
            {i === cur && studentId && <span className='dot-arrow' />}
          </span>
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
