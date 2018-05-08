import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Prompt } from 'react-router-dom'
import LessonEditor from './LessonEditor'
import LessonForm from './LessonForm'
import PropTypes from 'prop-types'
import { Icon, Card } from 'antd'
import enhancer from './enhancer'
import Course from '../Course'
import Header from './Header'
import React from 'react'

import './CourseEditor.less'

const CourseEditor = props => {
  const {
    orderedLessons: lessons = [],
    course = {},
    isLoaded,
    courseId,
    editKey,
    onDrop,
    mode
  } = props

  if (!isLoaded) return <span />

  return (
    <div>
      <Header {...props} />
      <Prompt
        when={props.isDirty}
        message={location =>
          'You have unsaved changes. Are you sure want to leave this page and discard your changes?'
        } />
      <div className='main-col'>
        {mode === 'edit' ? (
          <span>
            <DragDropContext onDragEnd={onDrop}>
              <Droppable droppableId='lessons' type='lesson'>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    {lessons.map((lesson, i) => (
                      <Draggable
                        key={lesson.id}
                        type='lesson'
                        draggableId={lesson.id}
                        index={i}>
                        {(provided, snapshot) => (
                          <div>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}>
                              <LessonEditor
                                {...props}
                                handleProps={{ ...provided.dragHandleProps }}
                                course={courseId}
                                key={lesson.id}
                                lesson={lesson} />
                            </div>
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <AddLesson
              {...props}
              course={courseId}
              editing={editKey === 'addLesson'} />
          </span>
        ) : (
          <Course progress={{}} course={course} preview />
        )}
      </div>
    </div>
  )
}

const AddLesson = ({ editing, setEditKey, draft, course }) => {
  return editing ? (
    <Card
      bordered={false}
      className='course lesson-editor'
      style={{ marginBottom: 40 }}>
      <LessonForm
        mode='addLesson'
        draft={draft}
        course={course}
        setEditKey={setEditKey} />
    </Card>
  ) : (
    <div
      onClick={() => setEditKey('addLesson')}
      className='add-section'
      style={{ padding: 40, fontSize: 16, marginTop: 40 }}>
      <Icon type='plus-circle' style={{ marginRight: 10 }} />
      Add a Lesson
    </div>
  )
}

CourseEditor.propTypes = {}

export default enhancer(CourseEditor)
