import modalContainer from 'components/modalContainer'
import { Menu, Button, Icon, Avatar, Row, Col } from 'antd'
import SchoolModal from '../School/SchoolModal'
import { Link } from 'react-router-dom'
import mapValues from '@f/map-values'
import MenuTitle from './MenuTitle'
import ClassItem from './ClassItem'
import UserMenu from '../UserMenu'
import PropTypes from 'prop-types'
import React from 'react'
import './Sidebar.less'

class Sidebar extends React.PureComponent {
  render () {
    const {
      classesBySchool = [],
      onCreateModal,
      modal,
      uid,
      logout,
      profile
    } = this.props
    const roles = mapValues(role => role, profile.schools)
    const isTeacher = roles.indexOf('teacher') > -1

    return (
      <div className='main-sidebar'>
        <UserMenu
          logout={logout}
          isTeacher={isTeacher}
          overlayStyle={{ margin: '0 10px' }}
          button={
            <Row
              type='flex'
              align='middle'
              style={{
                padding: '15px 20px',
                borderBottom: '1px solid rgba(238, 238, 238, 0.1)'
              }}>
              <Col>
                <Avatar icon='user' />
              </Col>
              <Col className='flex-grow'>{profile.displayName}</Col>
              <Col>
                <Icon type='caret-down' style={{ fontSize: 9 }} />
              </Col>
            </Row>
          } />
        <Menu
          theme='dark'
          mode='inline'
          openKeys={Object.keys(classesBySchool)}
          selectedKeys={[window.location.pathname]}
          style={{ borderRight: 0 }}>
          {isTeacher && (
            <Menu.Item key={'/courses'}>
              <Link to='/courses'>
                <Icon type='appstore-o' />Courses
              </Link>
            </Menu.Item>
          )}
          {mapValues(
            (school, key) => (
              <Menu.SubMenu
                title={
                  <MenuTitle {...this.props} school={{ ...school, id: key }} />
                }
                key={key}>
                {school.classes.map(cls => (
                  <Menu.Item key={'/class/' + cls.id} className='class-item'>
                    <ClassItem
                      isTeacher={cls.teachers[uid]}
                      modal={modal}
                      school={key}
                      cls={cls} />
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ),
            classesBySchool
          )}
          <Menu.Divider />
        </Menu>
        <div style={{ padding: '12px 24px' }}>
          <Button
            style={{ width: '100%' }}
            onClick={modal.showModal('schoolModal')}>
            <Icon type='plus' />New School
          </Button>
        </div>
        {modal.isVisible('schoolModal') && (
          <SchoolModal
            visible
            onOk={msg => onCreateModal(msg, 'schoolModal')}
            onCancel={modal.hideModal('schoolModal')} />
        )}
      </div>
    )
  }
}

Sidebar.propTypes = {}

export default modalContainer(Sidebar)
