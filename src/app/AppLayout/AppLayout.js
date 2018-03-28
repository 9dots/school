// import { Route, Switch } from 'react-router-dom'
// import StudentHeader from '../Header/StudentHeader'
import Sidebar from '../Sidebar'
import React, { Component } from 'react'
import styles from 'theme/vars/vars.js'
import { Layout } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import mapValues from '@f/map-values'
// import Header from '../Header'

class AppLayout extends Component {
  render () {
    const {
      children,
      onCreateModal,
      uid,
      profile,
      nav,
      classesBySchool
    } = this.props

    console.log(this.props)

    const roles = mapValues(role => role, profile.schools)
    const isTeacher = roles.indexOf('teacher') > -1
    return (
      <Layout>
        <Layout.Sider width={styles['@sidebar-width']}>
          <Sidebar
            onCreateModal={onCreateModal}
            uid={uid}
            profile={profile}
            currentClass={nav}
            classesBySchool={classesBySchool} />
        </Layout.Sider>
        <Layout.Content>
          {/* <Switch>
          <Route
            path='/class/:classId/lesson/:lessonId/:taskNum'
            render={({ match: { params } }) => <span />} />
          <Route
            exact
            path='/class/:classId'
            render={({ match: { params } }) =>
              isTeacher ? (
                <Header {...rest} {...params} />
              ) : (
                <StudentHeader {...rest} {...params} />
              )
            } />
          <Route path='*' render={() => <Header isLoaded {...rest} />} />
        </Switch> */}
          {children}
        </Layout.Content>
      </Layout>
    )
  }
}

AppLayout.propTypes = {}

export default enhancer(AppLayout)
