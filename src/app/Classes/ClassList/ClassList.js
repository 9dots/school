// import PropTypes from 'prop-types'
// import { firestoreConnect } from 'redux-firestore'
import { firestoreConnect } from 'react-redux-firebase'
import SchoolDropdown from '../SchoolDropdown'
import { Menu, Button, Icon } from 'antd'
import React, { Component } from 'react'
import ClassModal from '../ClassModal'
import { connect } from 'react-redux'
import { compose } from 'recompose'
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
  connect(({ firestore: { ordered: { myClasses } } }) => ({ myClasses }))
)

class ClassList extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  hideModal = () => {
    this.setState({
      visible: false
    })
  }
  render () {
    const { currentSchool, myClasses = [] } = this.props
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 62px)',
          borderRight: '1px solid #e8e8e8'
        }}>
        <SchoolDropdown currentSchool={currentSchool} />
        <Menu mode='inline' style={{ borderRight: 0 }}>
          {!!myClasses.length && <Menu.Divider />}
          {myClasses.map(({ displayName, id }) => (
            <Menu.Item key={id}>{displayName}</Menu.Item>
          ))}
          <Menu.Divider />
        </Menu>
        <div style={{ padding: '12px 24px' }}>
          <Button style={{ width: '100%' }} onClick={this.showModal}>
            <Icon type='plus' />New Class
          </Button>
        </div>
        <ClassModal
          visible={this.state.visible}
          school={currentSchool.id}
          onOk={this.hideModal}
          onCancel={this.hideModal} />
      </div>
    )
  }
}

ClassList.propTypes = {}

export default enhancer(ClassList)
