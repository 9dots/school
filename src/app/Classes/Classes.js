import { Switch, Route, Redirect } from 'react-router-dom'
import backpack from 'assets/images/emptypack.png'
import React, { Component } from 'react'
import EmptyState from 'app/EmptyState'
import styles from 'theme/vars/vars.js'
import ClassModal from './ClassModal'
import { Layout, Icon } from 'antd'
import ClassList from './ClassList'
import Loading from '../Loading'
import enhancer from './enhancer'
import Class from './Class'
import './Classes.less'

class Classes extends Component {
  render () {
    const {
      match,
      currentSchool,
      profile: { nav = {} },
      profileReady,
      myClasses = []
    } = this.props
    const currentClass = (match.params || {}).classId
    const lastClass =
      (nav.class ? { id: nav.class[nav.school] } : myClasses[0]) || {}

    if (!profileReady) {
      return <Loading />
    }

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
            render={props => (
              <NoClasses lastClass={lastClass.id} {...this.props} />
            )} />
        </Switch>
        {this.props.isVisible('classModal') && (
          <ClassModal
            visible
            school={currentSchool.id}
            onOk={this.props.hideModal('classModal')}
            onCancel={this.props.hideModal('classModal')} />
        )}
      </Layout>
    )
  }
}

const NoClasses = props => {
  // if (props.lastClass) {
  //   return <Redirect to={`/class/${props.lastClass}`} />
  // }
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
      action={props.showModal('classModal')} />
  )
}

Classes.propTypes = {}

export default enhancer(Classes)
