import { Spin, Icon } from 'antd'
import React from 'react'
import './Loading.less'

const Loading = props => (
  <div className='loading'>
    <Spin indicator={<Icon type='loading' style={{ fontSize: 24 }} spin />} />
  </div>
)

export default Loading
