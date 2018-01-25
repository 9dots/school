import { firestoreConnect } from 'react-redux-firebase'
import ModalContainer from 'components/ModalContainer'
import SchoolDropdown from '../SchoolDropdown'
import { Menu, Button, Icon } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
          {myClasses.map(({ displayName, id }) => (
            <Menu.Item key={id}>
              <Link to={`/class/${id}`}>{displayName}</Link>
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

ClassList.propTypes = {}

export default enhancer(ClassList)
