import PropTypes from 'prop-types'
import { Collapse, Button, Icon, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import './LessonList.less'

const LessonList = ({ lessons = [], added, ...rest }) => {
  return (
    <Collapse accordion bordered={false} className='lesson-list' {...rest}>
      {lessons.map((lesson, key) => {
        return (
          <Collapse.Panel
            key={key}
            header={<Header {...lesson} added={added} i={key} />}>
            <Tasks tasks={lessons} />
          </Collapse.Panel>
        )
      })}
    </Collapse>
  )
}

const Header = ({ displayName, description, added, i }) => (
  <div className='clearfix'>
    {/* <div className='lesson-number'>{i + 1}</div> */}
    <div className='lesson-header'>
      <h3 className='ellipsis'>{displayName}</h3>
      <p className='ellipsis'>{description}</p>
    </div>
    <div className='extra'>
      <Button onClick={e => e.stopPropagation()}>
        <Icon type='file-ppt' />
        Slides
      </Button>
      <Button onClick={e => e.stopPropagation()}>
        <Icon type='profile' />
        Lesson Plan
      </Button>
      {!!added && (
        <Button onClick={e => e.stopPropagation()}>
          <Icon type='export' />
          Assign
        </Button>
      )}
    </div>
  </div>
)

const Tasks = ({ tasks }) => (
  <List className='task-list'>
    {tasks.map(({ displayName, description }, i) => (
      <List.Item key={i}>
        <List.Item.Meta
          avatar={<Avatar size='small'>{i + 1}</Avatar>}
          title={displayName}
          description={description} />

        <Link to={'/'} className='extra'>
          <Icon type='eye-o' />
          Preview
        </Link>
      </List.Item>
    ))}
  </List>
)

LessonList.propTypes = {}

export default LessonList
