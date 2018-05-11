import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import './ClassSelect.less'

const ClassSelect = ({ school = {}, classes = [], schoolId, colors }) => {
  const withStudents = classes.filter(c => Object.keys(c.students || {}).length)
  const numCols = Math.ceil(Math.sqrt(withStudents.length))
  const span = Math.min(Math.max(2, Math.ceil(24 / numCols), 6))

  return (
    <Col style={{ maxWidth: 900 }} align='center'>
      <div className='school-header'>
        <h1>{school.displayName}</h1>
      </div>
      <h2>Select your Teacher</h2>
      <Row
        type='flex'
        className='flex-wrap'
        style={{ maxWidth: 250 * numCols }}>
        {withStudents.map(({ displayName, id }, i) => (
          <Col key={id} span={span}>
            <Link
              to={`/school/${schoolId}/${id}`}
              className='login-button-wrapper'>
              <Button
                className='login-button'
                size='large'
                style={{
                  background: colors[i % numCols]
                }}>
                {displayName}
              </Button>
            </Link>
          </Col>
        ))}
      </Row>
    </Col>
  )
}

ClassSelect.propTypes = {
  school: PropTypes.object,
  classes: PropTypes.array
}

export default ClassSelect
