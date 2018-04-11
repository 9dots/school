import { Layout, Button, Icon, Menu } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import './Header.less'

const Header = ({ course, setMode, mode }) => {
  const {
    displayName,
    difficulty,
    duration = {},
    description,
    tags = {}
    // imageUrl,
    // id,
  } = course

  return (
    <Layout className='course-editor-header'>
      <Layout.Header>
        <Link style={{ float: 'left' }} to='/library'>
          <h3>
            <Button icon='left' shape='circle' type='primary' ghost />&ensp;BACK
          </h3>
        </Link>
        <div className='actions'>
          <Button style={{ marginRight: 10 }}>Saving…</Button>
          <Button type='primary'>Publish</Button>
        </div>
      </Layout.Header>
      <Layout.Content>
        <h1>
          {displayName}&ensp;<Icon type='edit' style={{ fontSize: 19 }} />
        </h1>
        <p>{description}</p>
        <div className='meta'>
          <Icon type='clock-circle-o' />
          {duration.time} {duration.unit}
          <Icon type='book' />
          Level {difficulty}
          <Icon type='tags-o' />
          {Object.keys(tags).join(', ')}
        </div>
      </Layout.Content>
      <Menu
        defaultSelectedKeys={[mode]}
        onClick={({ key }) => setMode(key)}
        mode='horizontal'
        className='center-items'>
        <Menu.Item key='edit'>
          <Icon type='edit' />Edit
        </Menu.Item>
        <Menu.Item key='preview'>
          <Icon type='eye-o' />Preview
        </Menu.Item>
      </Menu>
    </Layout>
  )
}

Header.propTypes = {}

export default Header
