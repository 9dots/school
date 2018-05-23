import StepModal from 'components/StepModal'
import ColumnSelect from './ColumnSelect'
import DisplaySheet from './DisplaySheet'
import enhancer from './enhancer'
import PropTypes from 'prop-types'
import React from 'react'

import './StudentCsvUpload.less'

const StudentCsvUpload = ({ data, ...rest }) => {
  return (
    <StepModal
      {...rest}
      modals={[ColumnSelect, DisplaySheet]}
      className='csv-modal'
      data={data} />
  )
}

StudentCsvUpload.propTypes = {}

export default enhancer(StudentCsvUpload)
