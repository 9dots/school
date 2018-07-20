import { Icon, Button, Row } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import './LessonControls.less'

const LessonControls = ({
  toggleCollapsed,
  progress,
  next,
  collapsed,
  match
}) => {
  const { taskNum } = match.params
  const length = progress.length
  const cur = parseInt(taskNum, 10)
  const isLast = length <= cur + 1

  return (
    <Row type='flex' align='middle' justify='end' className='lesson-controls'>
      <span onClick={next}>
        <Button
          type='primary'
          size='large'
          className='next-btn secondary rounded'>
          {isLast ? 'DONE' : 'NEXT'}
          <Icon type='right' />
        </Button>
      </span>
      <Button
        icon={collapsed ? 'bars' : 'close'}
        onClick={toggleCollapsed}
        style={{ marginLeft: 10 }}
        shape='circle'
        size='large' />
    </Row>
  )
}

LessonControls.propTypes = {}

export default LessonControls
