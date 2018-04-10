import Sidebar from '../Sidebar'
import React, { Component } from 'react'
import styles from 'theme/vars/vars.js'
import { Layout } from 'antd'
import { Route, Switch } from 'react-router-dom'
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

    const Sider = () => (
      <Layout.Sider className='main-sidebar' width={styles['@sidebar-width']}>
        <Sidebar
          onCreateModal={onCreateModal}
          uid={uid}
          profile={profile}
          logout={logout}
          classesBySchool={classesBySchool} />
      </Layout.Sider>
    )

    return (
      <Layout>
        <Switch>
          <Route path='/class/:classId/lesson/' />
          {/* <Route path='/library' /> */}
          <Route path='**' render={Sider} />
        </Switch>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    )
  }
}

AppLayout.propTypes = {}

export default enhancer(AppLayout)
