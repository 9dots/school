import { getValidationErrors, getFormDefaults } from 'utils'
import { firestoreConnect } from 'react-redux-firebase'
import modalContainer from 'components/modalContainer'
import formModal from 'components/formModal'
import { allClasses, uid } from 'selectors'
import waitFor from 'components/waitFor'
import mapValues from '@f/map-values'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import schema from 'school-schema'
import { rpc } from '../actions'
import { message } from 'antd'

export default compose(
  modalContainer,
  connect(state => ({
    uid: uid(state)
  })),
  firestoreConnect(props => [
    {
      collection: 'classes',
      where: [`teachers.${props.uid}`, '==', true],
      storeAs: `teacherClasses`
    }
  ]),
  connect(
    (state, props) => ({
      classes: allClasses(state),
      modalId: getSuccessModal(props.id)
    }),
    { rpc }
  ),
  formModal({
    displayName: 'addCourse',
    mapPropsToValues: () => ({}),
    handleSubmit: async (values, handbag) => {
      const { props } = handbag
      if (Object.keys(values).length === 0) {
        return
      }
      try {
        props.setLoading(true)
        console.log(cast(values, props))
        await Promise.all(
          cast(values, props).map(vals => props.rpc('class.addCourse', vals))
        )
        props.hideModal(props.id, null)
        props.showModal({
          name: props.modalId,
          classes: getSubmittedClasses(props, values)
        })(null)
      } catch (e) {
        props.setLoading(false)
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    ...getFormDefaults(schema.default.class.addCourse, cast),
    validate: (values, props) => {
      const formatted = cast(values, props)
      return formatted.some(val => schema.default.class.addCourse(val).errors)
    }
  }),
  waitFor(['classes'])
)

function getSubmittedClasses (props, values) {
  return props.classes.filter(cls => Object.keys(values).indexOf(cls.id) > -1)
}

function getSuccessModal (id) {
  return 'success-' + (id || 'modal')
}

function cast (values, props) {
  return mapValues(
    (cls, key) => ({
      course: props.courseId,
      class: key
    }),
    values
  )
}
