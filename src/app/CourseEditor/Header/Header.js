import PropTypes from 'prop-types'
import React from 'react'
import { Layout, Button, Icon, Menu } from 'antd'
import './Header.less'

const Header = ({ course, setMode, mode, setUrl }) => {
  const {
    duration = {},
    displayName,
    description,
    difficulty,
    tags = {}
  } = course

  return (
    <Layout className='course-editor-header'>
      <Layout.Header>
        <a style={{ float: 'left' }}>
          <h3>
            <Button
              onClick={() => setUrl('/library')}
              icon='left'
              shape='circle'
              type='primary'
              ghost />&ensp;BACK
          </h3>
        </a>
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
