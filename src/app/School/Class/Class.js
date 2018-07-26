import TeacherClass from './TeacherClass'
import StudentClass from './StudentClass'
import Loading from '../../Loading'
import enhancer from './enhancer'
import omit from '@f/omit'
import React from 'react'
import './Class.less'

const Class = props => {
  const { classData = {}, isLoaded, auth } = props
  if (!isLoaded) return <Loading />
  const isTeacher = (classData.teachers || {})[auth.uid]

  return isTeacher ? (
    <TeacherClass {...omit('isLoaded', props)} />
  ) : (
    <StudentClass {...omit('isLoaded', props)} />
  )
}

Class.propTypes = {}

export default enhancer(Class)
