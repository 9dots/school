import PropTypes from 'prop-types'
import { Menu, Avatar, Progress } from 'antd'
import React from 'react'
import './StudentList.less'

const StudentList = props => {
  const h = '40px'
  return (
    <Menu
      mode='vertical-right'
      fluid
      style={{
        minHeight: 'calc(100vh - 62px)',
        paddingTop: 20
      }}>
      {students.map(i => (
        <Menu.Item
          key={i}
          onClick={() => console.log(i)}
          style={{ margin: 0, lineHeight: h, height: h }}>
          {/* <Avatar size='small' style={{ marginRight: 10, textAlign: 'center' }}>
            {['A', 'B', 'E', 'C', 'Q', 'S'][Math.round(Math.random() * 6)]}
          </Avatar> */}
          Student {i}
          {/* <Progress type='circle' width={32} /> */}
        </Menu.Item>
      ))}
    </Menu>
  )
}

StudentList.propTypes = {}

export default StudentList

const students = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21
]
