import { startSetProfile } from '../../../middleware/profileUpdating'
import { Menu, Icon, Avatar, Row, Col, Dropdown } from 'antd'
import { firestoreConnect } from 'react-redux-firebase'
import ModalContainer from 'components/ModalContainer'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import SchoolDetails from '../SchoolDetails'
import { rpc, setUrl } from '../../actions'
import React, { Component } from 'react'
import SchoolModal from '../SchoolModal'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import PropTypes from 'prop-types'

import './SchoolDropdown.less'

const enhancer = compose(
  withRouter,
  firestoreConnect(),
  ModalContainer,
  connect(({ firebase: { profile, auth: { uid } } }, props) => ({
    schools: mapValues((role, id) => ({ role, id }), profile.schools).filter(
      school => school.id !== props.currentSchool.id
    )
  })),
  withHandlers({
    onSelect: ({ dispatch, firestore, history, uid }) => key => {
      dispatch(startSetProfile())
      return dispatch(rpc('user.setNav', { 'nav.school': key }))
        .then(() => dispatch(setUrl(history, '/')))
        .catch(console.warn)
    }
  })
)

class SchoolDropdown extends Component {
  menuClick = ({ key }) => {
    switch (key) {
      case 'newSchool':
        this.props.showModal()
        break
      default:
        this.props.onSelect(key)
    }
  }
  render () {
    const { currentSchool, schools = [], hideModal, modalVisible } = this.props
    const schoolMenu = (
      <Menu className='school-menu' onClick={this.menuClick}>
        {schools.length && [
          <Menu.Item key='schoolHeader' className='no-pointer'>
            <b>My Schools </b>
          </Menu.Item>,
          <Menu.Divider key='divider1' />,
          ...schools.map(val => (
            <Menu.Item key={val.id}>
              {/* <Link to='/'> */}
              <SchoolDetails school={val.id} />
              {/* </Link> */}
            </Menu.Item>
          )),
          <Menu.Divider key='divider2' />
        ]}
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
          visible={modalVisible}
          onOk={hideModal}
          onCancel={hideModal} />
      </span>
    )
  }
}

SchoolDropdown.propTypes = {}

export default enhancer(SchoolDropdown)
