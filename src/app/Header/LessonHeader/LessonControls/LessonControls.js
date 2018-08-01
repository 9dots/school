import { Icon, Button, Row } from 'antd'
import enhancer from './enhancer'
import PropTypes from 'prop-types'
import React from 'react'

import './LessonControls.less'

const LessonControls = ({
  becameComplete,
  teacherView,
  toggleSider,
  progress,
  next,
  collapsed,
  match
}) => {
  const { taskNum } = match.params
  const length = progress.length
  const cur = parseInt(taskNum, 10)
  const isLast = length <= cur + 1
  const task = progress[cur] || {}
  const integration = task.integration
  const isComplete = task.progress >= 100
  const flash = integration && becameComplete && !teacherView && isComplete
  const opacity = teacherView || !integration ? 1 : isComplete ? 1 : 0.75

  return (
    <Row type='flex' align='middle' justify='end' className='lesson-controls'>
      <span onClick={next}>
        <Button
          type='primary'
          size='large'
          style={{ opacity }}
          className={`next-btn secondary rounded ${flash ? 'btn-flash' : ''}`}>
          {isLast ? 'DONE' : 'NEXT'}
          <Icon type='right' />
        </Button>
      </span>
      <Button
        icon={collapsed ? 'bars' : 'close'}
        style={{ marginLeft: 10 }}
        onClick={toggleSider}
        shape='circle'
        size='large' />
    </Row>
  )
}

LessonControls.propTypes = {}

export default enhancer(LessonControls)
