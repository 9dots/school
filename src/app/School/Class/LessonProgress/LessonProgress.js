import { Modal, Layout, Menu, Card } from 'antd'
import ProgressTable from './ProgressTable'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './LessonProgress.less'

const LessonProgress = ({
  studentProgress,
  progress,
  setTask,
  lesson,
  active,
  task,
  data,
  ...rest
}) => {
  const { tasks = [], displayName, description } = lesson

  return (
    <Modal
      width='100%'
      style={{ top: 0 }}
      className='lesson-progress-modal'
      wrapClassName='full-page-modal'
      footer={''}
      {...rest}>
      <Layout style={{ background: 'transparent' }}>
        <Layout.Sider width={250} style={{ background: 'transparent' }}>
          <Menu
            mode='inline'
            selectedKeys={[active]}
            onClick={setTask}
            style={{
              background: 'transparent',
              height: '100vh',
              paddingTop: 50
            }}>
            <Menu.Item className='no-pointer'>
              <b>Tasks</b>
            </Menu.Item>
            {tasks.map((task, i) => (
              <Menu.Item key={task.id}>
                {i + 1}.&ensp;{task.displayName}
              </Menu.Item>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <h1>{displayName}</h1>
          <p>{description}</p>
          <Card className='course' bordered={false}>
            <h2>{task.displayName}</h2>
            <ProgressTable data={data} />
          </Card>
        </Layout.Content>
      </Layout>
    </Modal>
  )
}

LessonProgress.propTypes = {}

export default enhancer(LessonProgress)
