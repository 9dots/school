import { Modal, Layout, Menu, Card, Icon } from 'antd'
import ProgressTable from './ProgressTable'
import { Link } from 'react-router-dom'
import { getTaskTitle } from 'utils'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Loading from 'app/Loading'
import React from 'react'

import './LessonProgress.less'

const LessonProgress = ({
  studentProgress,
  teacherView,
  progress,
  isLoaded,
  setTask,
  lesson,
  active,
  task,
  onOk,
  data,
  ...rest
}) => {
  const { tasks = [], displayName, description, module: moduleId } = lesson
  const content = (
    <Layout style={{ background: 'transparent' }}>
      <Layout.Sider width={250} style={{ background: 'transparent' }}>
        <Menu
          mode='inline'
          selectedKeys={[active]}
          onClick={setTask}
          style={{
            background: 'transparent',
            height: '100vh'
          }}>
          <Menu.Item key='all'>
            <Icon type='line-chart' />&nbsp;All Tasks
          </Menu.Item>
          {tasks.map((task, i) => (
            <Menu.Item key={task.id}>
              {i + 1}.&emsp;{getTaskTitle(task)}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout.Content>
        <h1>{displayName}</h1>
        <p>{description}</p>
        <Card className='course' bordered={false}>
          <h2>{task ? getTaskTitle(task) : 'Average score for all Tasks'}</h2>
          {teacherView ? (
            <Link target='_blank' to={teacherView}>
              View in app
            </Link>
          ) : (
            <ProgressTable moduleId={moduleId} data={data} />
          )}
        </Card>
      </Layout.Content>
    </Layout>
  )
  return (
    <Modal
      width='100%'
      style={{ top: 0 }}
      className='lesson-progress-modal'
      wrapClassName='full-page-modal'
      footer={''}
      closable={false}
      {...rest}>
      <Icon type='left-circle-o' className='full-page-back' onClick={onOk} />
      {isLoaded ? content : <Loading />}
    </Modal>
  )
}

LessonProgress.propTypes = {}

export default enhancer(LessonProgress)
