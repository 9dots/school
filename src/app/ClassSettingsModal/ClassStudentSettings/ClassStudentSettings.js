import { Card, Button, Dropdown, Icon, Menu, Table } from 'antd'
import { getAvatarByValue } from 'utils'
import PropTypes from 'prop-types'
import getProp from '@f/get-prop'
import enhancer from './enhancer'
import React from 'react'

import './ClassStudentSettings.less'

const ClassStudentSettings = props => {
  const {
    resettingPassword,
    selectedStudents,
    removeStudents,
    printPasswords,
    openDropdown,
    tableConfig,
    isSelected,
    addStudent,
    classData,
    students
  } = props

  const { passwordType = 'text' } = classData

  return (
    <div className='class-student-settings'>
      <div className='actions'>
        <Button icon='user-add' type='primary' onClick={addStudent}>
          Add Student
        </Button>
        <Dropdown
          disabled={resettingPassword}
          overlay={
            <Menu onClick={({ key }) => props.setPasswordType(key)}>
              {
                {
                  image: <Menu.Item key='text'>Use Text Password</Menu.Item>,
                  text: <Menu.Item key='image'>Use Image Password</Menu.Item>
                }[passwordType]
              }
            </Menu>
          }>
          <Button>
            Use {passwordType === 'text' ? 'Text' : 'Image'} Password
            <Icon type={resettingPassword ? 'loading' : 'down'} />
          </Button>
        </Dropdown>
        <Button icon='printer' onClick={printPasswords} disabled={!isSelected}>
          Print Passwords
        </Button>
        <Button
          disabled={!isSelected}
          onClick={() => removeStudents(selectedStudents)}
          icon='delete'
          type='danger'
          style={{ float: 'right' }}>
          Remove Students
        </Button>
      </div>
      <Card className='course'>
        <Table
          rowKey='id'
          rowSelection={tableConfig}
          rowClassName={({ id }) => (id === openDropdown ? 'open' : '')}
          dataSource={students.filter(s => s)}
          pagination={false}
          columns={columns(props)} />
      </Card>
    </div>
  )
}

const columns = props => [
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
    dataIndex: `passwords.${props.classData.passwordType}`,
    render: password =>
      props.classData.passwordType === 'text' ? (
        <span style={{ fontFamily: 'monospace' }}>{password}</span>
      ) : (
        <img style={{ width: 50 }} src={getAvatarByValue(password)} />
      )
  },
  {
    key: 'actions',
    render: s => (
      <Dropdown
        disabled={props.resettingPassword}
        trigger={['click']}
        overlay={
          <Menu onClick={({ key }) => props.studentMenuClick(key, s)}>
            <Menu.Item key='edit'>Edit Details</Menu.Item>
            <Menu.Item key='remove'>Remove Student</Menu.Item>
            <Menu.Item key='resetPassword'>Change Password</Menu.Item>
          </Menu>
        }
        placement='bottomRight'
        onVisibleChange={v => props.setOpenDropdown(v, s.id)}>
        <a className='ant-dropdown-link'>
          <Icon type='setting' />
        </a>
      </Dropdown>
    )
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

export default enhancer(ClassStudentSettings)
