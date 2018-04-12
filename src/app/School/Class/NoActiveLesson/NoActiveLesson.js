import waitFor from '../../../../components/waitFor/waitFor'
import { firestoreConnect } from 'react-redux-firebase'
import { moduleSelector } from '../../../../selectors'
import { connect } from 'react-redux'
import getProp from '@f/get-prop'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import React from 'react'
import './NoActiveLesson.less'

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
  waitFor(['mods'])
)

const NoActiveLesson = ({ mods = [], onAssign, isLoaded }) => {
  if (!isLoaded) {
    return <span />
  }
  const module = mods[0]
  const lesson = getProp('0.lessons.0', mods, {})
  return (
    <div className='no-active-lesson'>
      <h2>No Active Lesson</h2>
      <p>Click the button below to start the next course for your class.</p>
      <Button
        type='primary'
        className='secondary'
        size='large'
        onClick={onAssign(lesson.id, module.id)}
        style={{ padding: '0 35px' }}>
        Start!
      </Button>
    </div>
  )
}

NoActiveLesson.propTypes = {}

export default enhancer(NoActiveLesson)
