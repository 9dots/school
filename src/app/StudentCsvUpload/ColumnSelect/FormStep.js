import { Icon, Radio, Tooltip } from 'antd'
import React from 'react'

const FormStep = ({ i, currentStep, setFieldValue, step, data }) => (
  <Radio.Group
    className={i === currentStep ? '' : 'hide'}
    key={i}
    onChange={e => setFieldValue(step.name, e.target.value)}
    name={step.name}>
    {data[0].map((col, j) => (
      <Radio key={j} value={j}>
        {col || 'Untitled'}
        <Tooltip
          trigger={['hover']}
          placement='right'
          overlayStyle={{
            whiteSpace: 'pre',
            fontSize: 12
          }}
          title={data
            .map(row => row[j] || 'Empty')
            .slice(1, 6)
            .join('\n')}>
          <Icon style={{ marginTop: 4, float: 'right' }} type='info-circle-o' />
        </Tooltip>
      </Radio>
    ))}
  </Radio.Group>
)

export default FormStep
