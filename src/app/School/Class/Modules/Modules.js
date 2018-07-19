import { firestoreConnect } from 'react-redux-firebase'
import { moduleSelector } from 'selectors'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import PropTypes from 'prop-types'
import Course from 'app/Course'
import React from 'react'
import './Modules.less'

const enhancer = compose(
  firestoreConnect(props =>
    props.modules.map(module => ({
      collection: 'modules',
      doc: module,
      storeAs: module
    }))
  ),
  connect((state, props) => ({
    mods: moduleSelector(state, props.modules)
  })),
  lifecycle({
    componentDidMount () {
      this.props.modules.map(module =>
        this.props.firestore.get({
          collection: 'modules',
          doc: module,
          storeAs: module
        })
      )
    }
  }),
  waitFor(['mods'])
)

const Modules = props => {
  console.log(props.mods)
  const {
    assignedLesson = {},
    onAssign = () => {},
    progress,
    assignToStudent,
    classId,
    student,
    mods
  } = props

  return (
    <span>
      {mods.map(
        module =>
          module && (
            <Course
              student={student}
              classId={classId}
              course={module}
              key={module.id}
              onAssign={onAssign}
              progress={progress}
              assignToStudent={assignToStudent}
              assignedId={(assignedLesson || {}).id}
              added />
          )
      )}
    </span>
  )
}

Modules.propTypes = {}

export default enhancer(Modules)
