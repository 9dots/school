import { compose, lifecycle } from 'recompose'
import modalContainer from 'components/modalContainer'
import { message } from 'antd'

export default compose(
  modalContainer,
  lifecycle({
    componentWillMount () {
      const { data, hideModal } = this.props
      const sanitized = sanitize(data)

      if (!sanitized.length) {
        message.error('Not enough data in your spreadsheet')
        hideModal('studentCsvModal', null)
      } else {
        this.setState({ data: sanitized })
      }
    }
  })
)

function sanitize (data) {
  const max = getMaxLength(data)
  let sanitized = []

  // Remove all rows with 1 or fewer coloumns
  data = data.filter(row => row.filter(col => col).length > 1)

  // Trim all columns and ensure each row is of equal length
  for (let i = 0; i < data.length; i++) {
    sanitized[i] = []
    for (let j = 0; j < max; j++) {
      sanitized[i].push(data[i][j] ? (data[i][j].toString() || '').trim() : '')
    }
  }

  return sanitized
}

function getMaxLength (data) {
  return data.reduce((acc, d) => (d.length > acc ? d.length : acc), 0)
}
