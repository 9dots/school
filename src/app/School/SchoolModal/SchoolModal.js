import { firestoreConnect } from 'react-redux-firebase'
import { Field, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import waitFor from 'components/waitFor/waitFor'
import { SelectField } from 'redux-form-antd'
import { withRouter } from 'react-router-dom'
import formModal from 'components/formModal'
import { rpc, setUrl } from 'app/actions'
import { Modal, Form, message } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import './SchoolModal.less'

const enhancer = compose(
  withRouter,
  formModal({ form: 'createSchool' }),
  firestoreConnect([{ collection: 'schools', orderBy: ['displayName'] }]),
  connect(
    (
      {
        firebase: { auth: { uid }, profile },
        firestore: { ordered: { schools = [] } }
      },
      props
    ) => ({
      schools: schools.filter(s => !profile.schools[s.id]).map(school => ({
        label: school.displayName,
        value: school.id
      })),
      ok: props.close(props.onOk),
      cancel: props.close(props.onCancel),
      uid
    }),
    { rpc, setUrl }
  ),
  withHandlers({
    onSubmit: props => async values => {
      const { uid, rpc, setLoading, ok } = props
      setLoading(true)
      try {
        await rpc('user.addToSchool', { user: uid, role: 'teacher', ...values })
        ok('Success! Joined school.')
      } catch (e) {
        setLoading(false)
        if (e === 'school_not_found') {
          throw new SubmissionError({
            school: 'School code not found.'
          })
        }
        message.error('Unknown error. Please try again.')
      }
    }
  }),
  waitFor(['schools'])
)
const commonProps = {
  validate: v => (v ? '' : 'Required')
}

const SchoolModal = props => {
  console.log(props.isLoaded)
  if (!props.isLoaded) return <span />
  return (
    <Modal
      visible
      title='Join A School'
      onCancel={props.close(props.onCancel)}
      confirmLoading={props.confirmLoading}
      onOk={props.handleSubmit(props.onSubmit)}>
      <Form>
        <Form.Item>
          <Field
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
