import CreateCourseModal from '../CreateCourseModal'
import { Layout, Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './Library.less'

const Library = ({ modal, onCreateCourse }) => {
  return (
    <Layout>
      <Layout.Header>
        <Row type='flex'>
          <Col>
            <h2>My Library</h2>
          </Col>
          <Col>
            <Button icon='plus' onClick={modal.showModal('createCourse')}>
              Create Course
            </Button>
          </Col>
        </Row>
      </Layout.Header>
      {modal.isVisible('createCourse') && (
        <CreateCourseModal
          visible
          onOk={onCreateCourse}
          onCancel={modal.hideModal('createCourse')} />
      )}
    </Layout>
  )
}

Library.propTypes = {}

export default enhancer(Library)
