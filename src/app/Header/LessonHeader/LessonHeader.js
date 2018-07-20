import LessonControls from './LessonControls'
import { Avatar, Icon, Layout, List, Row, Col, Menu } from 'antd'
import TaskDot from '../../../components/TaskDot'
import { getTaskTitle } from 'utils'
import { getTaskIcon } from 'utils/data'
import { Link } from 'react-router-dom'
import styles from 'theme/vars/vars.js'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './LessonHeader.less'

const LessonHeader = props => {
  const {
    profile,
    classId,
    taskNum,
    studentId,
    lesson = {},
    collapsed,
    toggleCollapsed,
    progress,
    tasks,
    goTo
  } = props
  const width = styles['@sidebar-width'] - 50
  const task = progress[taskNum] || {}

  return (
    <Layout className='lesson-header'>
      <Layout.Sider width={width}>
        <h2>
          <Link to={`/class/${classId}`}>
            <Icon type='home' size='large' style={{ marginRight: 10 }} />
            {profile.displayName}
          </Link>
        </h2>
      </Layout.Sider>
      <Layout.Content>
        <Row
          type='flex'
          justify='center'
          align='middle'
          className='control-title'>
          <TaskDot
            style={{ marginRight: 10 }}
            number={(task.index || 0) + 1}
            task={{ completed: task.completed }}
            size='default' />
          <Col>
            <h3>
              <b>{getTaskTitle(task)}</b>
            </h3>
            <h4>{lesson.displayName}</h4>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Sider width={width}>
        <LessonControls {...props} />
      </Layout.Sider>
      <Layout.Sider
        className='lesson-sider'
        collapsed={collapsed}
        collapsedWidth={0}
        defaultCollapsed
        trigger={null}
        width={230}
        collapsible>
        <Menu onClick={({ key }) => goTo(key)} mode='inline'>
          {progress.map((task, i) => (
            <Menu.Item key={i}>
              <span className='sider-item-title'>
                <TaskDot
                  number={i + 1}
                  style={{ marginRight: 10 }}
                  task={task} />
                {getTaskTitle(tasks[i])}
              </span>
              <Icon type={getTaskIcon(task)} />
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
    </Layout>
  )
}

LessonHeader.propTypes = {}

export default enhancer(LessonHeader)
