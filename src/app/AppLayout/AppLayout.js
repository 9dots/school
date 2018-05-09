import { Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import styles from 'theme/vars/vars.js'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import HomeHeader from '../HomeLayout/HomeHeader'
import Sidebar from '../Sidebar'
import { Layout } from 'antd'

class AppLayout extends Component {
  render () {
    const {
      showSidebar = true,
      classesBySchool,
      onCreateModal,
      children,
      profile,
      logout,
      uid
    } = this.props

    const Sider = () => (
      <Layout.Sider className='main-sider' width={styles['@sidebar-width']}>
        <Sidebar
          onCreateModal={onCreateModal}
          uid={uid}
          profile={profile}
          logout={logout}
          classesBySchool={classesBySchool} />
      </Layout.Sider>
    )

    // {!showSidebar && <HomeHeader />}
    return (
      <Layout>
        <Switch>
          <Route path='/class/:classId/lesson/' />
          {!showSidebar ? (
            <Route path='**' component={HomeHeader} />
          ) : (
            <Route path='**' component={Sider} />
          )}
        </Switch>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    )
  }
}

AppLayout.propTypes = {}

export default enhancer(AppLayout)
