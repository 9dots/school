import { Route, Switch } from 'react-router-dom'
import backpack from 'assets/images/emptypack.png'
import EmptyState from '../EmptyState'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Loading from '../Loading'
import Class from './Class'
import React from 'react'
import './School.less'

const School = props => {
  if (!props.isLoaded) return <Loading />

  return (
    <Switch>
      <Route
        path='/class/:classId'
        render={() => <Class key={props.classId} match={props.match} />} />
      <Route path='/class' render={() => noClasses(props)} />
    </Switch>
  )
}

const noClasses = props => (
  <EmptyState
    header='No Classes Yet'
    text='Create Your First Class Now!'
    image={backpack}
    btnText={
      <span>
        <Icon type='plus' style={{ marginRight: 10 }} />New Class
      </span>
    }
    action={props.showModal('classModal')} />
)

School.propTypes = {}

export default enhancer(School)
