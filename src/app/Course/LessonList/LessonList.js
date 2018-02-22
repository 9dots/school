import { compose, withHandlers } from 'recompose'
import { stopEvent } from '../../../utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { rpc } from '../../actions'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Collapse,
  Button,
  Icon,
  List,
  Avatar,
  Row,
  Col,
  Modal,
  message
} from 'antd'

import './LessonList.less'

const { confirm } = Modal

const enhancer = compose(
  connect(() => ({}), { rpc }),
  withHandlers({
    onAssign: props => lesson => e => {
      confirm({
        title: `Assign "${lesson.displayName}"`,
        content: `Are you sure want to assign "${
          lesson.displayName
        }" to your class?`,
        okText: 'Yes',
        cancelText: 'No',
        async onOk () {
          try {
            await props.rpc('class.assignLesson', {
              class: props.classId,
              lesson
            })
            message.success('Lesson assigned')
          } catch (e) {
            message.error(e.message)
          }
        }
      })
    }
  })
)

const LessonList = ({ lessons = [], added, onAssign, ...rest }) => {
  return (
    <Collapse accordion bordered={false} className='lesson-list' {...rest}>
      {lessons.map((lesson, key) => {
        return (
          <Collapse.Panel
            key={key}
            header={
              <Header
                onAssign={onAssign}
                {...lesson}
                lesson={lesson}
                added={added}
                i={lesson.id} />
            }>
            <Tasks tasks={lesson.tasks} />
          </Collapse.Panel>
        )
      })}
    </Collapse>
  )
}

const Header = props => {
  const { onAssign, displayName, description, added, lesson } = props
  return (
    <Row className='clearfix' type='flex' justify='space-between'>
      <Col className='lesson-header' span={14}>
        <h3 className='ellipsis'>{displayName}</h3>
        <p className='ellipsis'>{description}</p>
      </Col>
      <Col className='extra' span={10}>
        <span style={{ float: 'right' }}>
          <Button onClick={e => e.stopPropagation()}>
            <Icon type='file-ppt' />
            Slides
          </Button>
          <Button onClick={e => e.stopPropagation()}>
            <Icon type='profile' />
            Lesson Plan
          </Button>
          {!!added && (
            <Button onClick={stopEvent(onAssign(lesson))}>
              <Icon type='export' />
              Assign
            </Button>
          )}
        </span>
      </Col>
    </Row>
  )
}

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

export default enhancer(LessonList)
