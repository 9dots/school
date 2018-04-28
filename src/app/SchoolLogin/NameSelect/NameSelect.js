import PropTypes from 'prop-types'
import { Row, Col, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import enhancer from './enhancer'
import React from 'react'
import './NameSelect.less'

const NameSelect = ({
  school = {},
  students = [],
  colors,
  classId,
  schoolId,
  cls = {}
}) => {
  // const students = Object.keys(cls.students || {})
  const numCols = Math.ceil(Math.sqrt(students.length))
  const span = Math.min(Math.max(2, Math.ceil(24 / numCols), 6))
  // console.log(students)

  return (
    <Col style={{ maxWidth: 900 }} align='center'>
      <div className='school-header'>
        <Link to={`/school/${schoolId}`} className='back'>
          <Icon type='left' />&ensp;Back
        </Link>
        <h1>{cls.displayName}</h1>
      </div>
      <h2>Select your Name</h2>
      <Row
        type='flex'
        className='flex-wrap'
        style={{ maxWidth: 300 * numCols }}>
        {students.filter(s => s).map(({ displayName, id }, i) => (
          <Col key={i} span={span}>
            <div style={{ margin: 10 }}>
              <Button
                size='large'
                className='login-button'
                style={{
                  background: colors[i % numCols]
                }}>
                {displayName}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Col>
  )
}

NameSelect.propTypes = {}

export default enhancer(NameSelect)
