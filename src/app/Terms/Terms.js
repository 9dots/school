import PropTypes from 'prop-types'
import enhancer from './enhancer'
import { Modal } from 'antd'
import React from 'react'

import './Terms.less'

const version = 1

const Terms = props => {
  return (
    <Modal
      title='9 Dots Community Learning Center'
      visible={true}
      width={700}
      okText='I Accept'
      closable={false}
      confirmLoading={props.confirmLoading}
      cancelText='No'
      onCancel={props.logout}
      onOk={() => props.submit(version)}
      maskClosable={false}>
      <div style={{ fontSize: 13 }}>
        <p>
          <b>
            Single Sign On Agreement
            <span style={{ float: 'right' }}>Last Updated: July 30, 2018</span>
          </b>
        </p>
        <p>
          <b>
            By clicking the “I Accept” button and completing the registration
            process, I represent and warrant that I am an authorized School
            Administrator or Teacher, or a Parent or legal guardian of a Student
            at the School, or otherwise have permission to allow the Student(s)
            to use the 9 Dots Websites and Services (collectively, “9 Dots
            Resources”).
          </b>
        </p>
        <p>
          I agree to 9 Dots’s{' '}
          <a
            href='https://www.9dots.org/terms-of-service'
            rel='noopener noreferrer'
            target='_blank'>
            Terms of Use
          </a>{' '}
          and{' '}
          <a
            href='https://www.9dots.org/privacy'
            rel='noopener noreferrer'
            target='_blank'>
            Privacy Policy
          </a>{' '}
          with respect to my and my Student’s use of 9 Dots Resources.{' '}
          <b>
            I consent, and state that I am authorized to consent, to the sharing
            by my Students’ personal, performance and other information with 9
            Dots for the purpose of using 9 Dots Resources, and to the
            de-identification of my Students’ information (which information
            will be anonymized and aggregated to as not to identify any Student)
            for 9 Dots’s business purposes.
          </b>{' '}
          If I choose not to accept these Terms of Use and the Privacy Policy, I
          understand that I may not access or use 9 Dots Resources. Terms not
          defined here have the meaning set forth in 9 Dots&#39;s Terms of Use
          and Privacy Policy.
        </p>
        <p>
          By clicking “I Accept” I agree that I have read, understand and accept
          this Single Sign On Agreement, the Terms of Use, and the Privacy
          Policy.
        </p>
      </div>
    </Modal>
  )
}

Terms.propTypes = {}

export { version }
export default enhancer(Terms)
