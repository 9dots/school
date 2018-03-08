import React from 'react'
import StudentHeader from '../../Header/StudentHeader'
import Header from '../../Header/Header'
import enhancer from './enhancer'
import getProp from '@f/get-prop'
import './ClassHeader.css'

const ClassHeader = ({ classData = {}, auth = {}, ...rest }) => {
  const isTeacher = getProp('teachers.' + auth.uid, classData)

  return isTeacher ? <Header {...rest} /> : <StudentHeader {...rest} />
}

export default enhancer(ClassHeader)
