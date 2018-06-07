import { Progress, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './ProgressRow.less'

const ProgressRow = ({ user, progress, active }) => {
  const activeProgress = progress.find(p => p.activity === active)
  return (
    <Row className='progress-row' type='flex' style={{ width: '100%' }}>
      <Col className='flex-grow ellipsis'>{user.displayName}</Col>
      <Col style={{ minWidth: 200 }}>
        <Progress percent={activeProgress.progress} />
      </Col>
    </Row>
  )
}

ProgressRow.propTypes = {}

export default enhancer(ProgressRow)
