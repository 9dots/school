import { Modal, Layout, Menu, Card } from 'antd'
import mapValues from '@f/map-values'
import ProgressTable from './ProgressTable'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './LessonProgress.less'

const LessonProgress = ({
  lesson,
  studentProgress,
  active,
  setTask,
  ...rest
}) => {
  const { tasks = [], displayName, description } = lesson

  const task = tasks.find(({ id }) => id === active)

  const data = mapValues(({ progress, student }, key) => {
    const prog = progress ? progress.find(p => p.activity === active) : {}
    return {
      studentData: student,
      ...prog
    }
  }, studentProgress)

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
            {/* <List>
              {mapValues(
                (progress, uid) => (
                  <List.Item key={uid}>
                    <ProgressRow
                      uid={uid}
                      progress={progress}
                      active={active} />
                  </List.Item>
                ),
                studentProgress
              )}
            </List> */}
          </Card>
        </Layout.Content>
      </Layout>
    </Modal>
  )
}

LessonProgress.propTypes = {}

export default enhancer(LessonProgress)
