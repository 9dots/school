import StudentLoginModal from '../StudentLoginModal'
import { Row, Col, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './NameSelect.less'

const NameSelect = ({
  students = [],
  school = {},
  schoolId,
  cls = {},
  classId,
  colors,
  modal,
  ...rest
}) => {
  const numCols = Math.min(Math.ceil(Math.sqrt(students.length)), 4)
  const span = Math.min(Math.max(2, Math.ceil(24 / numCols), 6))

  return (
    <Col style={{ maxWidth: 1000 }} align='center'>
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
        style={{ maxWidth: 250 * numCols }}>
        {students.filter(s => s).map((student, i) => (
          <Col key={i} span={span}>
            <div style={{ margin: 10 }}>
              <Button
                size='large'
                onClick={modal.showModal({
                  name: 'studentLogin',
                  student,
                  passwordType: cls.passwordType
                })}
                className='login-button ellipsis'
                style={{
                  background: colors[i % numCols]
                }}>
                {student.displayName}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      {modal.isVisible('studentLogin') && (
        <StudentLoginModal
          {...modal.getProps('studentLogin')}
          onCancel={modal.hideModal('studentLogin')} />
      )}
    </Col>
  )
}

NameSelect.propTypes = {}

export default enhancer(NameSelect)
