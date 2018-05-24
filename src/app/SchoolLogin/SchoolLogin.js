import ClassSelect from './ClassSelect'
import NameSelect from './NameSelect'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Loading from '../Loading'
import { Row } from 'antd'
import React from 'react'

import './SchoolLogin.less'

const SchoolLogin = props => {
  const colors = ['#3c8074', '#e6a730', '#2e7599', '#745280']
  if (!props.isLoaded) return <Loading />
  return (
    <Row className='school-login' type='flex' justify='center'>
      {props.classId ? (
        <NameSelect {...props} colors={colors} />
      ) : (
        <ClassSelect {...props} colors={colors} />
      )}
    </Row>
  )
}

SchoolLogin.propTypes = {}

export default enhancer(SchoolLogin)
