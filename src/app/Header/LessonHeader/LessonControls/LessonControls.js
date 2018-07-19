import TaskDot from 'components/TaskDot'
import { Link } from 'react-router-dom'
import toRegexp from 'path-to-regexp'
import { Icon, Button, Row } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import urlJoin from 'url-join'
import React from 'react'

import './LessonControls.less'

const path1Re = toRegexp(
  '/class/:classId/module/:moduleId/lesson/:lessonId/:taskNum'
)
const path2Re = toRegexp(
  '/class/:classId/module/:moduleId/lesson/:lessonId/:taskNum/:uid'
)

const LessonControls = ({
  tasks,
  lesson,
  progress,
  studentId,
  windowWidth
}) => {
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
  const length = progress.length
  const cur = parseInt(current, 10)
  const isLast = length <= cur + 1
  const delta = windowWidth <= 1087 ? 3 : 4
  const pageSize = delta * 2 - 1
  const dotDisplay = getDisplay(progress, cur, delta)

  return (
    <Row type='flex' align='middle' justify='end' className='lesson-controls'>
      {/* <Link to={prev()} disabled={!cur}>
        <Icon type='left' size='large' />
      </Link>
      <span className='dots'>
        {progress.map(
          (val, i) =>
            dotDisplay[i] === 'ellipsis' ? (
              <Link
                to={i === 1 ? prev(pageSize) : next(pageSize)}
                style={{ color: 'white', margin: '0 8px', cursor: 'pointer' }}>
                . . .
              </Link>
            ) : (
              <span
                key={i}
                style={{ display: dotDisplay[i] }}
                className='dot-wrap'>
                <Link to={urlJoin(path, '' + i, uid)}>
                  <TaskDot
                    task={{ ...val, ...tasks[i] }}
                    theme='dark'
                    multiple
                    number={i + 1} />
                </Link>
                {i === cur && studentId && <span className='dot-arrow' />}
              </span>
            )
        )}
      </span> */}
      <Link to={next()}>
        <Button type='primary' size='large' className='next-btn secondary rounded'>
          {isLast ? 'DONE' : 'NEXT'}
          <Icon type='right' />
        </Button>
      </Link>
      <Button
        icon='bars'
        style={{ marginLeft: 10 }}
        shape='circle'
        size='large' />
    </Row>
  )

  function prev (delta = 1) {
    return urlJoin(path, '' + Math.max(0, cur - delta), uid)
  }
  function next (delta = 1) {
    return isLast
      ? `/class/${classId}/`
      : urlJoin(path, '' + Math.min(progress.length - 1, cur + delta), uid)
  }
}

function getDisplay (pages, current, delta = 4) {
  const cur = Math.min(Math.max(current, delta), pages.length - delta - 1)
  if (pages.length <= delta * 2 + 2) return {}

  return pages.map((page, i) => {
    if (!i || i === pages.length - 1) {
      // ensure ends are always displayed
      return 'inline'
    } else if (i > cur - delta && i < cur + delta) {
      // Display dots that are within delta from current position
      return 'inline'
    } else if (i === pages.length - 2 || i === 1) {
      // only show ellipsis for hidden dots directly next to ends
      return 'ellipsis'
    } else return 'none'
  }, {})
}

LessonControls.propTypes = {}

export default enhancer(LessonControls)
