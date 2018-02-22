import { compose, withHandlers } from 'recompose'
import { stopEvent } from '../../../utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { rpc } from '../../actions'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Collapse,
  Tooltip,
  message,
  Button,
  Avatar,
  Modal,
  Icon,
  List,
  Row,
  Col
} from 'antd'

import './LessonList.less'

const { confirm } = Modal

const enhancer = compose(
  connect(() => ({}), { rpc }),
  withHandlers({
    onAssign: props => lesson => async e => {
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

const LessonList = ({ lessons = [], added, onAssign, assignedId, ...rest }) => {
  return (
    <Collapse accordion bordered={false} className='lesson-list' {...rest}>
      {lessons.map((lesson, key) => {
        return (
          <Collapse.Panel
            key={key}
            header={
              <Header
                onAssign={onAssign}
                assigned={assignedId === lesson.id}
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
  const { onAssign, displayName, description, added, lesson, assigned } = props
  return (
    <Row className='clearfix' type='flex' justify='space-between'>
      <Col className='lesson-header flex-grow' style={{ paddingRight: 10 }}>
        <h3>{displayName}</h3>
        <p>{description}</p>
      </Col>
      <Col className='extra'>
        {!added ? (
          <span>
            <Button onClick={e => e.stopPropagation()}>
              <Icon type='file-ppt' />
              Slides
            </Button>
            <Button onClick={e => e.stopPropagation()}>
              <Icon type='profile' />
              Lesson Plan
            </Button>
          </span>
        ) : (
          <span>
            <Tooltip
              title='Lesson Plan'
              mouseEnterDelay={0.4}
              onClick={stopEvent(() => {})}>
              <Icon type='bars' />
            </Tooltip>
            <Tooltip
              title='Slides'
              mouseEnterDelay={0.4}
              onClick={stopEvent(() => {})}>
              <Icon type='file-ppt' />
            </Tooltip>
            {assigned ? (
              <Button
                type='primary'
                className='green no-pointer'
                style={{ borderRadius: 20 }}>
                Assigned
              </Button>
            ) : (
              <Button onClick={stopEvent(onAssign(lesson))}>
                <Icon type='export' />
                Assign
              </Button>
            )}
          </span>
        )}
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
