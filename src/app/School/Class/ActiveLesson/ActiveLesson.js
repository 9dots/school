import { Card, List, Avatar, Icon, Tooltip } from 'antd'
import { stopEvent } from '../../../../utils'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import './ActiveLesson.less'

const ActiveLesson = ({ lesson }) => {
  const { displayName, tasks } = lesson

  return (
    <Card className='course' title={<h2>{displayName}</h2>} bordered={false}>
      <List className='task-list'>
        {tasks.map(({ displayName, description }, i) => (
          <List.Item key={i}>
            <List.Item.Meta
              avatar={<Avatar size='small'>{i + 1}</Avatar>}
              title={
                <span style={{ fontWeight: 'normal' }}>{displayName}</span>
              }
              description={description} />

            <Tooltip
              title='Preview'
              mouseEnterDelay={0.4}
              onClick={stopEvent(() => {})}>
              <Icon type='eye-o' style={{ marginRight: 10 }} />
            </Tooltip>
            <Tooltip
              title='Progress'
              mouseEnterDelay={0.4}
              onClick={stopEvent(() => {})}>
              <Icon type='area-chart' />
            </Tooltip>
          </List.Item>
        ))}
      </List>
    </Card>
  )
}

ActiveLesson.propTypes = {}

export default ActiveLesson
