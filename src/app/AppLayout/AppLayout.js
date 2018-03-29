import Sidebar from '../Sidebar'
import React, { Component } from 'react'
import styles from 'theme/vars/vars.js'
import { Layout } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'

class AppLayout extends Component {
  render () {
    const {
      children,
      onCreateModal,
      uid,
      profile,
      logout,
      classesBySchool
    } = this.props

    return (
      <Layout>
        <Layout.Sider
          className='main-sidebar'
          width={styles['@sidebar-width']}
          style={{
            height: '100vh'
          }}>
          <Sidebar
            onCreateModal={onCreateModal}
            uid={uid}
            profile={profile}
            logout={logout}
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
