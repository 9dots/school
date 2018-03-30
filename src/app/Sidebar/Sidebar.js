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
  // state = { openKeys: Object.keys(this.props.profile.schools) }
  // toggleSubMenu = openKeys => this.setState({ openKeys })
  render () {
    const {
      classesBySchool = [],
      onCreateModal,
      isVisible,
      showModal,
      hideModal,
      uid,
      logout,
      profile
    } = this.props
    // const { openKeys } = this.state
    const roles = mapValues(role => role, profile.schools)
    const isTeacher = roles.indexOf('teacher') > -1

    return (
      <div className='main-sidebar'>
        {!!isTeacher && (
          <UserMenu
            logout={logout}
            overlayStyle={{ margin: '0 10px' }}
            button={
              <Row type='flex' align='middle' style={{ padding: '10px 20px' }}>
                <Col>
                  <Avatar icon='user' />
                </Col>
                <Col className='flex-grow'>{profile.displayName}</Col>
                <Col>
                  <Icon type='caret-down' style={{ fontSize: 9 }} />
                </Col>
              </Row>
            } />
        )}
        <Menu
          theme='dark'
          mode='inline'
          openKeys={Object.keys(classesBySchool)}
          // onOpenChange={this.toggleSubMenu}
          selectedKeys={[window.location.pathname]}
          style={{ borderRight: 0 }}>
          <Menu.Item key={'/courses'}>
            <Link to='/courses'>
              <Icon type='appstore-o' />Courses
            </Link>
          </Menu.Item>
          <Menu.Item key='/analytics'>
            <Link to='/analytics'>
              <Icon type='dot-chart' />Analytics
            </Link>
          </Menu.Item>
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
                      showModal={showModal}
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
          <Button style={{ width: '100%' }} onClick={showModal('schoolModal')}>
            <Icon type='plus' />New School
          </Button>
        </div>
        {isVisible('schoolModal') && (
          <SchoolModal
            visible
            onOk={msg => onCreateModal(msg, 'schoolModal')}
            onCancel={hideModal('schoolModal')} />
        )}
      </div>
    )
  }
}

Sidebar.propTypes = {}

export default modalContainer(Sidebar)