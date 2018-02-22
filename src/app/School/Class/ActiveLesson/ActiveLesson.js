import PropTypes from 'prop-types'
import React from 'react'
import { Card, List, Avatar, Icon } from 'antd'
import { Link } from 'react-router-dom'
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

            {/* <Link to={'/'} className='extra'>
              <Icon type='eye-o' />
              Preview
            </Link> */}
          </List.Item>
        ))}
      </List>
    </Card>
  )
}

ActiveLesson.propTypes = {}

export default ActiveLesson
