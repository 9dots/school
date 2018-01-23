import { firestoreConnect } from 'react-redux-firebase'

import React, { Component } from 'react'
import { Layout, Icon } from 'antd'
import styles from 'theme/vars/vars.js'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import ClassList from './ClassList'
import { compose } from 'recompose'
import EmptyState from 'app/EmptyState'
import Class from './Class'
import './Classes.less'

const enhancer = compose(
  connect(({ firebase: { auth, profile } }) => ({
    profile
  })),
  firestoreConnect(props =>
    mapValues(
      (school, key) => ({
        collection: 'schools',
        doc: key,
        storeAs: key
      }),
      props.profile.schools
    )
  ),
  connect(({ firestore: { data } }, { profile: { currentSchool } }) => ({
    currentSchool: { ...data[currentSchool], id: currentSchool }
  }))
)

class Classes extends Component {
  render () {
    const { currentSchool, classes = [] } = this.props
    return (
      <Layout>
        <Layout.Sider width={styles['@sidebar-width']}>
          <ClassList currentSchool={currentSchool} />
        </Layout.Sider>
        {console.log(currentSchool)}
        {!classes.length ? (
          <EmptyState
            text='No Classes Yet. Create Your First Class'
            icon='book'
            // image='http://dancefactory.lu/wp-content/uploads/2017/06/no-class_1.jpg'
            btnText={
              <span>
                <Icon type='plus' style={{ marginRight: 10 }} />New Class
              </span>
            }
            action={() => {}} />
        ) : (
          <Class />
        )}
      </Layout>
    )
  }
}

Classes.propTypes = {}

export default enhancer(Classes)
