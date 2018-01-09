import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import Header from '../Header'

class TeacherLayout extends Component {
  render () {
    return (
      <Layout>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.Content>{this.props.children}</Layout.Content>
      </Layout>
    )
  }
}

TeacherLayout.propTypes = {}

export default TeacherLayout
