import PropTypes from 'prop-types'
import { Collapse, Button } from 'antd'
import React from 'react'
import './LessonList.less'

const LessonList = ({ lessons = [], ...rest }) => {
  return (
    <Collapse accordion bordered={false} className='lesson-list' {...rest}>
      {lessons.map((lesson, key) => {
        return (
          <Collapse.Panel key={key} header={<Header {...lesson} i={key} />}>
            Lorem ipsum doler etat. Something else about how awesome this lesson
            and its tasks are. Yay Yay Yay.
          </Collapse.Panel>
        )
      })}
    </Collapse>
  )
}

const Header = ({ displayName, description, i }) => (
  <div className='clearfix'>
    <div className='lesson-number'>{i + 1}</div>
    <div className='lesson-header'>
      <h3 className='ellipsis'>{displayName}</h3>
      <p className='ellipsis'>{description}</p>
    </div>
    <div className='extra'>
      <Button style={{ marginRight: 10 }}>Slides</Button>
      <Button>Lesson Plan</Button>
    </div>
  </div>
)

LessonList.propTypes = {}

export default LessonList
