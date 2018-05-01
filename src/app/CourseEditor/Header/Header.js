import CreateCourseModal from 'app/CreateCourseModal'
import { Layout, Button, Icon, Menu } from 'antd'
import { idsToText, gradesToText } from 'utils/data'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import './Header.less'

const Header = props => {
  const {
    publishing,
    courseId,
    isDirty,
    setMode,
    publish,
    course,
    draft,
    modal,
    mode
  } = props
  const {
    duration = {},
    displayName,
    description,
    published,
    tags = {},
    grade
  } = course

  return (
    <Layout className='course-editor-header'>
      <Layout.Header>
        <Link style={{ float: 'left' }} to='/library'>
          <h3>
            <Button icon='left' shape='circle' type='primary' ghost />&ensp;BACK
          </h3>
        </Link>
        <div className='actions'>
          <Button
            disabled={!isDirty}
            loading={publishing}
            onClick={() => publish(courseId)}
            type='primary'>
            Publish
          </Button>
        </div>
      </Layout.Header>
      <Layout.Content>
        <h1>
          {displayName}&ensp;<Icon
            onClick={modal.showModal('editCourse')}
            type='edit'
            style={{ cursor: 'pointer', fontSize: 19 }} />
        </h1>
        <p>{description}</p>
        <div className='meta'>
          <Icon type='clock-circle-o' />
          {duration.time} {duration.unit}
          <Icon type='book' />
          {gradesToText(Object.keys(grade))}
          <Icon type='tags-o' />
          {idsToText('tags', Object.keys(tags))}
        </div>
      </Layout.Content>
      <Menu
        defaultSelectedKeys={[mode]}
        onClick={({ key }) => setMode(key)}
        mode='horizontal'
        className='center-items'>
        <Menu.Item key='edit'>
          <Icon type='edit' />Edit
        </Menu.Item>
        <Menu.Item key='preview'>
          <Icon type='eye-o' />Preview
        </Menu.Item>
      </Menu>
      {modal.isVisible('editCourse') && (
        <CreateCourseModal
          visible
          edit
          courseId={courseId}
          draft={draft}
          initialValues={{
            ...course,
            grade: Object.keys(course.grade).join(','),
            tags: Object.keys(course.tags)
          }}
          onOk={modal.hideModal('editCourse')}
          onCancel={modal.hideModal('editCourse')} />
      )}
    </Layout>
  )
}

Header.propTypes = {}

export default Header
