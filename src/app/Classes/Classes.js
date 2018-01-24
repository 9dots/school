import { firestoreConnect } from 'react-redux-firebase'
import ModalContainer from 'components/ModalContainer'
import React, { Component } from 'react'
import { Layout, Icon } from 'antd'
import styles from 'theme/vars/vars.js'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import ClassList from './ClassList'
import { compose } from 'recompose'
import EmptyState from 'app/EmptyState'
import Class from './Class'
import ClassModal from './ClassModal'
import backpack from 'assets/images/emptypack.png'
import './Classes.less'

const enhancer = compose(
  connect(({ firebase: { auth, profile } }) => ({
    profile
  })),
  firestoreConnect(props =>
    mapValues(
      (school, key) => ({
        collection: 'schools',
        doc: key,
        storeAs: key
      }),
      props.profile.schools
    )
  ),
  ModalContainer,
  connect(({ firestore: { data } }, { profile: { currentSchool } }) => ({
    currentSchool: { ...data[currentSchool], id: currentSchool }
  }))
)

class Classes extends Component {
  render () {
    const { currentSchool, classes = [] } = this.props
    return (
      <Layout>
        <Layout.Sider width={styles['@sidebar-width']}>
          <ClassList currentSchool={currentSchool} />
        </Layout.Sider>
        {classes.length ? (
          <EmptyState
            header='No Classes Yet'
            text='Create Your First Class Now!'
            image={backpack}
            btnText={
              <span>
                <Icon type='plus' style={{ marginRight: 10 }} />New Class
              </span>
            }
            action={this.props.showModal} />
        ) : (
          <Class school={currentSchool.id} />
        )}
        <ClassModal
          visible={this.props.modalVisible}
          school={currentSchool.id}
          onOk={this.props.hideModal}
          onCancel={this.props.hideModal} />
      </Layout>
    )
  }
}

Classes.propTypes = {}

export default enhancer(Classes)
