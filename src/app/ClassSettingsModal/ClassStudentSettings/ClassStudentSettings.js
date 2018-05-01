import { Card, Button, Dropdown, Icon, Menu, Table } from 'antd'
import './ClassStudentSettings.less'
import getProp from '@f/get-prop'
import PropTypes from 'prop-types'
import React from 'react'

const tableConfig = {}

const ClassStudentSettings = ({ students, classData }) => {
  return (
    <div className='class-student-settings'>
      <div className='actions'>
        <Button icon='user-add' type='primary'>
          Add Student
        </Button>
        <Button icon='printer' type='primary'>
          Print Passwords
        </Button>
        <Dropdown overlay={menu}>
          <Button>
            Use Image Password
            <Icon type='down' />
          </Button>
        </Dropdown>
        <Button icon='delete' type='danger' style={{ float: 'right' }}>
          Remove Students
        </Button>
      </div>
      <Card className='course'>
        <Table
          rowKey='id'
          rowSelection={tableConfig}
          dataSource={students}
          pagination={false}
          columns={columns} />
      </Card>
    </div>
  )
}

const menu = (
  <Menu>
    <Menu.Item key='1'>Use Text Password</Menu.Item>
    <Menu.Item key='2'>Use Image Password</Menu.Item>
  </Menu>
)

const columns = [
  {
    title: 'First',
    key: 'first',
    dataIndex: 'name.given',
    sorter: (a, b) => alphaSort(a, b, 'name.given')
  },
  {
    title: 'Last',
    key: 'last',
    dataIndex: 'name.family',
    sorter: (a, b) => alphaSort(a, b, 'name.family')
  },
  {
    title: 'SSID',
    key: 'ssid',
    dataIndex: 'studentId'
  },
  {
    title: 'Password',
    key: 'password',
    dataIndex: 'password'
  }
]

function alphaSort (a, b, selector) {
  let nameA = getProp(selector, a).toLowerCase()
  let nameB = getProp(selector, b).toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}

ClassStudentSettings.propTypes = {}

export default ClassStudentSettings
