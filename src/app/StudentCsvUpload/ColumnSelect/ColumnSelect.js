import { Modal, Icon, Tooltip, Button, Col, Row } from 'antd'
import getProp from '@f/get-prop'
import FormStep from './FormStep'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import steps from './steps'
import React from 'react'
import './ColumnSelect.less'

const ColumnSelect = props => {
  const { currentStep, values, ...rest } = props
  const step = steps[currentStep]

  return (
    <Modal
      {...rest}
      okText='Next'
      footer={null}
      title={`Select ${step.title}`}
      onOk={() => {}}>
      <div className='name-format'>
        <p className='description'>{step.description}</p>
        <form onSubmit={props.handleSubmit}>
          {steps.map((step, i) => (
            <FormStep key={i} i={i} step={step} {...props} />
          ))}
          <Stepper
            {...props}
            valid={getProp(step.name, values) !== undefined} />
        </form>
      </div>
    </Modal>
  )
}

ColumnSelect.propTypes = {}

export default enhancer(ColumnSelect)

const Stepper = ({ currentStep, back, valid, next, handleSubmit }) => (
  <Row type='flex' gutter={16} justify='end' style={{ marginTop: 20 }}>
    <Col>
      <Button onClick={back} disabled={!currentStep}>
        <Icon type='left' />
        Back
      </Button>
    </Col>
    <Col>
      {currentStep === steps.length - 1 ? (
        <Button type='primary' htmlType='submit' onClick={handleSubmit}>
          Done
        </Button>
      ) : (
        <Tooltip title={valid ? false : 'Select an option'}>
          <Button disabled={!valid} type='primary' onClick={next}>
            Next
            <Icon type='right' />
          </Button>
        </Tooltip>
      )}
    </Col>
  </Row>
)
