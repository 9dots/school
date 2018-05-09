import { Modal, List, Row, Col, Button } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import './PrintPasswords.less'

const PrintPasswords = ({ students, passwordType = 'image', ...rest }) => {
  return (
    <Modal
      visible
      wrapClassName='print-modal'
      onCancel
      className='print-passwords'
      footer={''}
      closable={false}
      {...rest}>
      <Button
        type='primary'
        className='secondary no-print print-button'
        onClick={window.print}>
        Print
      </Button>
      <List>
        {students.map(s => (
          <List.Item key={s.id}>
            <Row style={{ width: '100%' }}>
              <Col span={12}>{s.displayName}</Col>
              <Col span={12}>Password: {s.passwords[passwordType]}</Col>
            </Row>
          </List.Item>
        ))}
      </List>
    </Modal>
  )
}

PrintPasswords.propTypes = {}

export default PrintPasswords
