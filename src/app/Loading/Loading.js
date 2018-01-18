import { Spin, Icon, Row, Col } from 'antd'
import React from 'react'
import './Loading.less'

const Loading = props => (
  <Row className='page-loader' type='flex' justify='center' align='middle'>
    <Col>
      <div className='loader-text'>Loading…</div>
      <Spin indicator={<Icon type='loading' className='loader-icon' spin />} />
    </Col>
  </Row>
)

export default Loading
