import { Redirect, Route, Switch } from 'react-router-dom'
import backpack from 'assets/images/emptypack.png'
import styles from 'theme/vars/vars.js'
import EmptyState from '../EmptyState'
import ClassModal from './ClassModal'
import { Layout, Icon } from 'antd'
import ClassList from './ClassList'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Loading from '../Loading'
import Class from './Class'
import React from 'react'
import './School.less'

const School = props => {
  if (!props.isLoaded) return <Loading />
  if (shouldRedirect(props)) {
    return <Redirect to={getRedirect(props)} />
  }
  return (
    <Layout>
      <Layout.Sider width={styles['@sidebar-width']}>
        <ClassList
          onCreateClass={props.onCreateClass}
          schoolData={props.schoolData}
          currentClass={props.classId}
          myClasses={props.myClasses}
          school={props.school} />
      </Layout.Sider>
      <Switch>
        <Route
          path='/school/:school/class/:classId'
          render={() => <Class key={props.classId} match={props.match} />} />
        <Route path='/school/:school' render={() => noClasses(props)} />
      </Switch>
    </Layout>
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

function getRedirect (props) {
  return `${props.match.url}/class/${getLastClass(props)}`
}

function shouldRedirect (props) {
  return props.myClasses.length && !props.classId
}

function getLastClass (props) {
  if (props.nav && props.nav.class) {
    return props.nav.class[props.school]
  }
  return props.myClasses[0].id
}

School.propTypes = {}

export default enhancer(School)
