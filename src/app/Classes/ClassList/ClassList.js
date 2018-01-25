import CreateStudentModal from 'app/StudentList/CreateStudentModal'
import { firestoreConnect } from 'react-redux-firebase'
import ModalContainer from 'components/ModalContainer'
import { Menu, Button, Icon, Row, Col } from 'antd'
import SchoolDropdown from '../SchoolDropdown'
import React, { Component } from 'react'
import { Link, history } from 'react-router-dom'
import ClassModal from '../ClassModal'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import './ClassList.less'

const enhancer = compose(
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  firestoreConnect(props => [
    {
      collection: 'classes',
      where: [
        [`teachers.${props.uid}`, '==', true],
        ['school', '==', props.currentSchool.id]
      ],
      storeAs: `myClasses-${props.currentSchool.id}`
    }
  ]),
  ModalContainer,
  connect(({ firestore: { ordered } }, props) => ({
    myClasses: ordered[`myClasses-${props.currentSchool.id}`]
  }))
)

class ClassList extends Component {
  render () {
    const {
      currentSchool,
      currentClass,
      myClasses = [],
      showModal,
      hideModal,
      modalVisible
    } = this.props
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 62px)',
          borderRight: '1px solid #e8e8e8'
        }}>
        <SchoolDropdown currentSchool={currentSchool} />
        <Menu
          selectedKeys={[currentClass]}
          mode='inline'
          style={{ borderRight: 0 }}>
          {!!myClasses.length && <Menu.Divider />}
          {myClasses.map(cls => (
            <Menu.Item key={cls.id} className='class-item'>
              <ClassItem cls={cls} school={currentSchool.id} />
            </Menu.Item>
          ))}
          <Menu.Divider />
        </Menu>
        <div style={{ padding: '12px 24px' }}>
          <Button style={{ width: '100%' }} onClick={showModal}>
            <Icon type='plus' />New Class
          </Button>
        </div>
        <ClassModal
          visible={modalVisible}
          school={currentSchool.id}
          onOk={hideModal}
          onCancel={hideModal} />
      </div>
    )
  }
}

const ClassItem = ModalContainer(
  ({ cls, hideModal, modalVisible, showModal, school }) => {
    return (
      <Link to={`/class/${cls.id}`}>
        <Row type='flex' justify='space-between' align='middle'>
          <Col>{cls.displayName}</Col>
          <Col className='class-actions'>
            <Button
              type='primary'
              ghost
              onClick={e => {
                e.preventDefault()
                return showModal()
              }}
              icon='user-add'
              shape='circle'
              size='small' />
          </Col>
        </Row>
        <CreateStudentModal
          onOk={hideModal}
          class={cls}
          school={school}
          onCancel={hideModal}
          visible={modalVisible} />
      </Link>
    )
  }
)

ClassList.propTypes = {}

export default enhancer(ClassList)
