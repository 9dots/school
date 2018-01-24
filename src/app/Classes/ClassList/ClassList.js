import { firestoreConnect } from 'react-redux-firebase'
import ModalContainer from 'components/ModalContainer'
import SchoolDropdown from '../SchoolDropdown'
import AddStudentModal from 'app/StudentList/AddStudentModal'
import { Menu, Button, Icon, Row, Col } from 'antd'
import React, { Component } from 'react'
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
      storeAs: 'myClasses'
    }
  ]),
  ModalContainer,
  connect(({ firestore: { ordered: { myClasses } } }) => ({ myClasses }))
)

class ClassList extends Component {
  render () {
    const {
      currentSchool,
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
        <ClassMenu classes={myClasses} />
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

const ClassMenu = ModalContainer(
  ({ classes, hideModal, modalVisible, showModal }) => {
    return (
      <Menu mode='inline' style={{ borderRight: 0 }}>
        {!!classes.length && <Menu.Divider />}
        {classes.map(({ displayName, id }) => (
          <Menu.Item key={id} className='class-item'>
            <Row type='flex' justify='space-between' align='middle'>
              <Col>{displayName}</Col>
              <Col className='class-actions'>
                <Button
                  onClick={showModal}
                  type='primary'
                  ghost
                  icon='user-add'
                  shape='circle'
                  size='small' />
              </Col>
            </Row>
            <AddStudentModal
              onOk={hideModal}
              onCancel={hideModal}
              visible={modalVisible} />
          </Menu.Item>
        ))}
        <Menu.Divider />
      </Menu>
    )
  }
)

ClassList.propTypes = {}

export default enhancer(ClassList)
