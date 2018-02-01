import { Field, reduxForm, SubmissionError } from 'redux-form'
import { firestoreConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import { SelectField } from 'redux-form-antd'
import { connect } from 'react-redux'
import { rpc, setUrl } from '../../actions'
import { Modal, Form } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import './SchoolModal.less'

const enhancer = compose(
  firestoreConnect([{ collection: 'schools', orderBy: ['displayName'] }]),
  connect(
    ({
      firebase: { auth: { uid }, profile },
      firestore: { ordered: { schools = [] } }
    }) => ({
      schools: schools.filter(s => !profile.schools[s.id]).map(school => ({
        label: school.displayName,
        value: school.id
      })),
      uid
    })
  ),
  reduxForm({ form: 'createSchool' }),
  withHandlers({
    onSubmit: ({ uid, dispatch, history }) => values => {
      return dispatch(
        rpc('user.addToSchool', {
          user: uid,
          role: 'teacher',
          ...values
        })
      )
        .then(res => {
          if (!res.ok) {
            throw new Error(res.error)
          }
          return dispatch(setUrl(history, '/'))
        })
        .catch(e => {
          console.warn(e)
          throw new SubmissionError({
            school: 'School code not found.'
          })
        })
    }
  })
)
const commonProps = {
  validate: v => (v ? '' : 'Required')
}

const SchoolModal = props => {
  return (
    <Modal
      {...props}
      title='Join A School'
      onOk={props.handleSubmit(props.onSubmit)}>
      <Form>
        <Form.Item>
          <Field
            {...commonProps}
            name='school'
            placeholder='Select a School'
            options={props.schools}
            notFoundContent='No schools to join'
            component={SelectField} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

SchoolModal.propTypes = {}

export default enhancer(SchoolModal)
