import { firestoreConnect } from 'react-redux-firebase'
import formModal from '../../../components/formModal'
import { Field, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { SelectField } from 'redux-form-antd'
import { withRouter } from 'react-router-dom'
import { rpc, setUrl } from '../../actions'
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
      const { uid, history, rpc, setLoading, setUrl, ok } = props
      setLoading(true)
      try {
        await rpc('user.addToSchool', { user: uid, role: 'teacher', ...values })
        ok('Success! Joined school.')
        setUrl(history, `/school/${values.school}`)
      } catch (e) {
        setLoading(false)
        if (e === 'school_not_found') {
          throw new SubmissionError({
            school: 'School code not found.'
          })
        }
        message('Unknown error. Please try again.')
      }
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
      onCancel={props.close(props.onCancel)}
      confirmLoading={props.confirmLoading}
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
