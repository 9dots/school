import waitFor from '../../components/waitFor'
import { profile } from '../../selectors'
import { connect } from 'react-redux'
import { compose } from 'recompose'

export default compose(
  connect((state, { match: { params } }) => ({
    profile: profile(state),
    nav: profile(state).nav
  })),
  waitFor(['profile'])
)
