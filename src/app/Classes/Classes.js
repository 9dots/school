import ClassList from 'app/ClassList'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import React from 'react'
import './Classes.less'

const Classes = props => {
  return (
    <Layout>
      <Layout.Sider>
        <ClassList />
      </Layout.Sider>
      <div style={{ minHeight: 'calc(100vh - 64px)', padding: 20 }}>
        askdjhkajshdkajshd
      </div>
    </Layout>
  )
}

Classes.propTypes = {}

export default Classes
