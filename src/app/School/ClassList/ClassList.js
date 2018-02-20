import modalContainer from 'components/modalContainer'
import { Menu, Button, Icon, Row, Col } from 'antd'
import { stopEvent } from '../../../utils'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ClassModal from '../ClassModal'
import SchoolModal from '../SchoolModal'
import mapValues from '@f/map-values'
// import PropTypes from 'prop-types'
import './ClassList.less'

class ClassList extends React.PureComponent {
  state = { openKeys: Object.keys(this.props.profile.schools) }
  toggleSubMenu = openKeys => this.setState({ openKeys })
  render () {
    const {
      classesBySchool = [],
      onCreateModal,
      currentClass,
      isVisible,
      showModal,
      hideModal
    } = this.props
    const { openKeys } = this.state

    return (
      <div
        style={{
          minHeight: 'calc(100vh - 62px)',
          borderRight: '1px solid #e8e8e8'
        }}
        className='class-list'>
        <Menu
          mode='inline'
          openKeys={openKeys}
          onOpenChange={this.toggleSubMenu}
          selectedKeys={[currentClass]}
          style={{ borderRight: 0 }}>
          {mapValues(
            (school, key) => (
              <Menu.SubMenu
                title={
                  <MenuTitle {...this.props} school={{ ...school, id: key }} />
                }
                key={key}>
                {school.classes.map(cls => (
                  <Menu.Item key={cls.id} className='class-item'>
                    <ClassItem showModal={showModal} school={key} cls={cls} />
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ),
            classesBySchool
          )}
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

const ClassItem = ({ cls, showModal, school }) => {
  return (
    <Link to={`/class/${cls.id}`}>
      <Row type='flex' justify='space-between' align='middle'>
        <Col>{cls.displayName}</Col>
        <Col className='class-actions'>
          <Button
            type='primary'
            ghost
            onClick={stopEvent(showModal('createStudent'))}
            icon='user-add'
            shape='circle'
            size='small' />
        </Col>
      </Row>
    </Link>
  )
}

const MenuTitle = ({
  hideModal,
  isVisible,
  showModal,
  onCreateModal,
  school
}) => {
  const { id, displayName } = school
  return (
    <div>
      <Row type='flex' justify='space-between' align='middle'>
        <Col>
          <b>{displayName}</b>
        </Col>
        <Col>
          <Button
            style={{ border: 'none' }}
            className='add-class-button'
            shape='circle'
            icon='plus'
            size='small'
            onClick={stopEvent(showModal('classModal-' + id))} />
        </Col>
      </Row>
      {isVisible('classModal-' + id) && (
        <ClassModal
          visible
          school={id}
          onOk={msg => onCreateModal(msg, 'classModal-' + id)}
          onCancel={hideModal('classModal-' + id)} />
      )}
    </div>
  )
}

ClassList.propTypes = {}

export default modalContainer(ClassList)
