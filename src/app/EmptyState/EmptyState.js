import PropTypes from 'prop-types'
import React from 'react'
import { Button, Layout, Icon } from 'antd'
import './EmptyState.less'

const EmptyState = ({ btnText, text, image, icon, action }) => {
  return (
    <Layout>
      <div className='empty-state'>
        {image ? <img src={image} /> : !!icon && <Icon type={icon} />}
        <h3>{text}</h3>
        <Button
          onClick={action}
          size='large'
          className='secondary'
          type='primary'
          ghost>
          {btnText}
        </Button>
        <Button onClick={action} size='large' type='primary' ghost>
          {btnText}
        </Button>
      </div>
    </Layout>
  )
}

EmptyState.propTypes = {}

export default EmptyState
