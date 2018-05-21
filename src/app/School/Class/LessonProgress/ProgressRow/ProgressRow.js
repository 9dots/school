import PropTypes from 'prop-types'
import React from 'react'
import { Progress, Row, Col } from 'antd'
import './ProgressRow.less'
import enhancer from './enhancer'

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
