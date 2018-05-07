import HomeHeader from './HomeHeader'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import React from 'react'

import './HomeLayout.less'

const HomeLayout = ({ allowSignIn, children }) => {
  return (
    <Layout>
      <HomeHeader allowSignIn={allowSignIn} />
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}

HomeLayout.propTypes = {}

export default HomeLayout
