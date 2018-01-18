import PropTypes from 'prop-types'
import { Card, Button, Icon, Tooltip } from 'antd'
import React from 'react'
import './Lesson.less'

const Lesson = ({ lesson }) => {
  const { title, status } = lesson
  const active = status === 'active'

  return (
    <Card
      className={'lesson' + (active ? ' active' : '')}
      title={<h3>{title}</h3>}
      extra={<Extra active={active} />}>
      {active && (
        <span>
          Some Sort Of Text about things and how this works or something I dont
          know
        </span>
      )}
    </Card>
  )
}

const Assets = () => (
  <span className='assets'>
    <Tooltip title='Lesson Plan' mouseEnterDelay={0.3}>
      <a style={{ marginRight: 12 }}>
        <Icon type='bars' />
      </a>
    </Tooltip>
    <Tooltip title='Slides' mouseEnterDelay={0.3}>
      <a>
        <Icon type='file-ppt' />
      </a>
    </Tooltip>
  </span>
)

const Extra = ({ active }) => {
  return (
    <span>
      <Assets />
      {active ? (
        <Button className='active-indicator no-pointer assign-btn'>
          <Icon type='check' />
          Assigned
        </Button>
      ) : (
        <Button ghost type='primary' className='assign-btn'>
          Assign
        </Button>
      )}
    </span>
  )
}

Lesson.propTypes = {}

export default Lesson
