import { Menu, Icon, Avatar, Row, Col, Dropdown } from 'antd'
import { compose, withHandlers } from 'recompose'
import SchoolDetails from '../SchoolDetails'
import React, { Component } from 'react'
import SchoolModal from '../SchoolModal'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import { rpc } from '../../actions'
import PropTypes from 'prop-types'

import './SchoolDropdown.less'
import { firestoreConnect } from 'react-redux-firebase'

const enhancer = compose(
  firestoreConnect(),
  connect(({ firebase: { profile, auth: { uid } } }, props) => ({
    schools: mapValues((role, id) => ({ role, id }), profile.schools).filter(
      school => school.id !== props.currentSchool.id
    )
  })),
  withHandlers({
    onSelect: ({ dispatch, firestore, uid }) => key => {
      return dispatch(rpc('user.setCurrentSchool', { school: key }))
        .then(console.log)
        .catch(console.warn)
    }
  })
)

class SchoolDropdown extends Component {
  state = { visible: false }
  menuClick = ({ key }) => {
    switch (key) {
      case 'newSchool':
        this.showModal()
        break
      default:
        this.props.onSelect(key)
    }
  }
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
    const { currentSchool, schools } = this.props
    const schoolMenu = (
      <Menu className='school-menu' onClick={this.menuClick}>
        {schools.length && (
          <span>
            <Menu.Item className='no-pointer'>
              <b>My Schools </b>
            </Menu.Item>
            <Menu.Divider />
            {schools.map(val => (
              <Menu.Item key={val.id}>
                <SchoolDetails school={val.id} />
              </Menu.Item>
            ))}
            <Menu.Divider />
          </span>
        )}
        <Menu.Item key='newSchool'>
          <Icon type='plus' style={{ marginRight: 10 }} /> New School
        </Menu.Item>
      </Menu>
    )

    return (
      <span>
        <Dropdown
          overlay={schoolMenu}
          trigger={['click']}
          placement='bottomCenter'>
          <Row
            type='flex'
            align='middle'
            justify='stretch'
            style={{
              cursor: 'pointer',
              height: 'auto',
              lineHeight: '20px',
              padding: '15px 16px'
            }}>
            <Col span={6}>
              <Avatar
                inline='true'
                size='large'
                style={{
                  background: '#faad14',
                  verticalAlign: 'middle'
                }}>
                S
              </Avatar>
            </Col>
            <Col span={18} className='ellipsis' style={{ paddingRight: 20 }}>
              <b>{currentSchool.displayName}</b>
              <br />
              <i>Teacher</i>
              <Icon type='down' style={{ position: 'absolute', right: 0 }} />
            </Col>
          </Row>
        </Dropdown>
        <SchoolModal
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal} />
      </span>
    )
  }
}

SchoolDropdown.propTypes = {}

export default enhancer(SchoolDropdown)
