import modalContainer from 'components/modalContainer'
import { setUrl } from '../../actions'
import { connect } from 'react-redux'
import { compose } from 'recompose'

export default compose(modalContainer, connect(null, { setUrl }))
