import { getFormDefaults, getValidationErrors, trimValues } from 'utils'
import { profile } from 'selectors'
import formModal from 'components/formModal'
import { rpc, setUrl } from 'app/actions'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import schema from 'school-schema'
import { message } from 'antd'

export default compose(
  connect(
    state => ({ profile: profile(state) }),
    { rpc, setUrl }
  ),
  formModal({
    displayName: 'createClass',
    mapPropsToValues: props => ({
      displayName: undefined,
      grade: undefined
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      const { setUrl, setLoading, rpc } = props
      setLoading(true)
      try {
        const cls = await rpc('class.createClass', cast(values, props))
        props.onOk(`Success! Created ${values.displayName}.`)
        await rpc('user.setNav', { class: cls.class })
        await setUrl(`/class/${cls.class}`)
      } catch (e) {
        setLoading(false)
        if (e === 'school_not_found') {
          return setErrors({ school: 'School code not found.' })
        } else if (e.errorDetails) {
          return setErrors(getValidationErrors(e))
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    ...getFormDefaults(schema.class.createClass, cast)
  })
)

function cast (values, props) {
  const trimmed = trimValues(values)
  return {
    ...trimmed,
    grade: isNaN(trimmed.grade) ? undefined : Number(trimmed.grade),
    school: props.school
  }
}
