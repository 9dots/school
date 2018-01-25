import { Switch, Route, Redirect } from 'react-router-dom'
import backpack from 'assets/images/emptypack.png'
import React, { Component } from 'react'
import EmptyState from 'app/EmptyState'
import styles from 'theme/vars/vars.js'
import ClassModal from './ClassModal'
import { Layout, Icon } from 'antd'
import ClassList from './ClassList'
import enhancer from './enhancer'
import Class from './Class'
import './Classes.less'

class Classes extends Component {
  render () {
    const { match, currentSchool, profile: { nav = {} } } = this.props
    const currentClass = (match.params || {}).classId
    const lastClass =
      nav.class[nav.school] || Object.keys(currentSchool.classes)[0]

    return (
      <Layout>
        <Layout.Sider width={styles['@sidebar-width']}>
          <ClassList
            currentClass={currentClass}
            currentSchool={currentSchool} />
        </Layout.Sider>
        <Switch>
          <Route path='/class/:classId' component={Class} />
          <Route
            path='/'
            component={props => (
              <NoClasses lastClass={lastClass} {...this.props} />
            )} />
        </Switch>
        <ClassModal
          visible={this.props.modalVisible}
          school={currentSchool.id}
          onOk={this.props.hideModal}
          onCancel={this.props.hideModal} />
      </Layout>
    )
  }
}

const NoClasses = props => {
  if (props.lastClass) {
    return <Redirect to={`/class/${props.lastClass}`} />
  }
  return (
    <EmptyState
      header='No Classes Yet'
      text='Create Your First Class Now!'
      image={backpack}
      btnText={
        <span>
          <Icon type='plus' style={{ marginRight: 10 }} />New Class
        </span>
      }
      action={props.showModal} />
  )
}

Classes.propTypes = {}

export default enhancer(Classes)
