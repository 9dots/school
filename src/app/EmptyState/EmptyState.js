import PropTypes from 'prop-types'
import React from 'react'
import { Button, Layout, Icon } from 'antd'
import './EmptyState.less'

const EmptyState = ({ btnText, header, text, image, icon, action, btn }) => {
  return (
    <Layout>
      <div className='empty-state'>
        {image ? (
          <img src={image} style={{ maxWidth: 140 }} />
        ) : (
          !!icon && <Icon type={icon} />
        )}
        <h2>{header}</h2>
        <h3>{text}</h3>
        {btn || (
          <Button
            onClick={action}
            size='large'
            className='secondary'
            type='primary'>
            {btnText}
          </Button>
        )}
      </div>
    </Layout>
  )
}

EmptyState.propTypes = {}

export default EmptyState
