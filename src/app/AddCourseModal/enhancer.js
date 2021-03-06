import { firestoreConnect } from 'react-redux-firebase'
import modalContainer from 'components/modalContainer'
import formModal from 'components/formModal'
import { teacherClasses, uid } from 'selectors'
import waitFor from 'components/waitFor'
import { getFormDefaults } from 'utils'
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
      classes: teacherClasses(state),
      modalId: getSuccessModal(props.id)
    }),
    { rpc }
  ),
  formModal({
    displayName: 'addCourse',
    mapPropsToValues: () => ({}),
    handleSubmit: async (values, { props }) => {
      if (Object.keys(values).length === 0) {
        return
      }
      try {
        props.setLoading(true)
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
    ...getFormDefaults(schema.class.addCourse, cast),
    validate: (values, props) => {
      const formatted = cast(values, props)
      return formatted.some(val => schema.class.addCourse(val).errors)
    }
  }),
  waitFor(['classes'])
)

function getSubmittedClasses (props, values) {
  return props.classes.filter(
    cls =>
      Object.keys(values)
        .filter(key => !!values[key])
        .indexOf(cls.id) > -1
  )
}

function getSuccessModal (id) {
  return 'success-' + (id || 'modal')
}

function cast (values, props) {
  return Object.keys(values)
    .filter(cls => !!values[cls])
    .map(cls => ({
      course: props.courseId,
      class: cls
    }))
}
