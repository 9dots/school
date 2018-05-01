import LessonDetails from './LessonDetails'
import TaskDetails from './TaskDetails'
import PropTypes from 'prop-types'
import { Card, List, Icon } from 'antd'
import enhancer from './enhancer'
import AddTask from './AddTask'
import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import './LessonEditor.less'

const LessonEditor = ({
  deleteLesson,
  handleProps,
  setEditKey,
  toggleMode,
  editKey,
  lesson,
  course,
  draft
}) => {
  const { tasks = [] } = lesson
  const editing = editKey === lesson.id + 'addTask'
  return (
    <span>
      <Card className='course lesson-editor' bordered={false}>
        <LessonDetails
          deleteLesson={deleteLesson}
          handleProps={handleProps}
          editKey={editKey}
          setEditKey={setEditKey}
          draft={draft}
          course={course}
          lesson={lesson} />
        <br />

        <Droppable droppableId={lesson.id} type='task'>
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {tasks.map((task, i) => (
                <Draggable
                  type='task'
                  key={task.id}
                  draggableId={task.id}
                  index={i}>
                  {(provided, snapshot) => (
                    <div>
                      <div
                        className={getClasses(snapshot, i)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <TaskDetails
                          handleProps={{ ...provided.dragHandleProps }}
                          task={task}
                          draft={draft}
                          editKey={editKey}
                          course={course}
                          lesson={lesson.id}
                          setEditKey={setEditKey} />
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {editing && (
          <AddTask
            editing={editKey === lesson.id + 'addTask'}
            setEditKey={setEditKey}
            draft={draft}
            course={course}
            lesson={lesson.id} />
        )}
      </Card>
      {!editing && <AddTaskButton lesson={lesson.id} setEditKey={setEditKey} />}
    </span>
  )
}

const AddTaskButton = ({ editing, lesson, setEditKey }) => (
  <div
    onClick={() => setEditKey(lesson + 'addTask')}
    className='add-section'
    style={{ borderTopColor: 'transparent' }}>
    <Icon type='plus-circle' style={{ marginRight: 10 }} />Add a Task
  </div>
)

const getClasses = function (snapshot, i) {
  let classes = 'task-details'
  if (!i) classes += ' first'
  if (snapshot.isDragging) classes += ' dragging'

  return classes
}

LessonEditor.propTypes = {}

export default enhancer(LessonEditor)
