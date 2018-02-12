import modalContainer from 'components/modalContainer'
import { Menu, Button, Icon, Row, Col } from 'antd'
import SchoolDropdown from '../SchoolDropdown'
import { stopEvent } from '../../../utils'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ClassModal from '../ClassModal'
// import PropTypes from 'prop-types'
import './ClassList.less'

class ClassList extends Component {
  render () {
    const {
      myClasses = [],
      onCreateClass,
      currentClass,
      isVisible,
      schoolData,
      showModal,
      hideModal,
      school
    } = this.props
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 62px)',
          borderRight: '1px solid #e8e8e8'
        }}>
        <SchoolDropdown schoolData={schoolData} school={school} />
        <Menu
          mode='inline'
          selectedKeys={[currentClass]}
          style={{ borderRight: 0 }}>
          {!!myClasses.length && <Menu.Divider />}
          {myClasses.map(cls => (
            <Menu.Item key={cls.id} className='class-item'>
              <ClassItem cls={cls} school={school} />
            </Menu.Item>
          ))}
          <Menu.Divider />
        </Menu>
        <div style={{ padding: '12px 24px' }}>
          <Button style={{ width: '100%' }} onClick={showModal('classModal')}>
            <Icon type='plus' />New Class
          </Button>
        </div>
        {
          <ClassModal
            visible={isVisible('classModal')}
            school={school}
            onOk={onCreateClass}
            onCancel={hideModal('classModal')} />
        }
      </div>
    )
  }
}

const ClassItem = modalContainer(
  ({ cls, hideModal, isVisible, showModal, school }) => {
    return (
      <Link to={`/school/${school}/class/${cls.id}`}>
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
)

ClassList.propTypes = {}

export default modalContainer(ClassList)
