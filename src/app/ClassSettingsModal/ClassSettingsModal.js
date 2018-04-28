import { Modal, Layout, Menu, Card, Icon } from 'antd'
import ClassSudentSettings from './ClassStudentSettings'
import ClassDetails from './ClassDetails'
import ClassLink from './ClassLink'
import enhancer from './enhancer'
import PropTypes from 'prop-types'
import React from 'react'
import './ClassSettingsModal.less'

const ClassSettingsModal = ({
  onOk,
  classData,
  students,
  tab,
  setTab,
  ...rest
}) => {
  const { displayName } = classData

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
      <Layout style={{ background: 'transparent' }}>
        <Layout.Sider width={250} style={{ background: 'transparent' }}>
          <Menu
            mode='inline'
            selectedKeys={[tab]}
            onClick={setTab}
            style={{
              background: 'transparent',
              height: '100vh'
            }}>
            <Menu.Item key='details'>
              <Icon type='info-circle-o' />&nbsp;Details
            </Menu.Item>
            <Menu.Item key='students'>
              <Icon type='user' />&nbsp;Students
            </Menu.Item>
            <Menu.Item key='link'>
              <Icon type='link' />&nbsp;Student Link
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <h1>{displayName} | Settings</h1>
          {
            {
              details: <ClassDetails classData={classData} />,
              students: (
                <ClassSudentSettings
                  classData={classData}
                  students={students} />
              ),
              link: <ClassLink classData={classData} />
            }[tab]
          }
        </Layout.Content>
      </Layout>
    </Modal>
  )
}

ClassSettingsModal.propTypes = {}

export default enhancer(ClassSettingsModal)
