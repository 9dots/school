import PropTypes from 'prop-types'
import { Card, Input, Icon, Divider } from 'antd'
import React from 'react'
import './ClassLink.less'

const ClassLink = props => {
  return (
    <Card className='course'>
      <h2>Getting Students Logged In!</h2>
      <Divider />
      <div style={{ maxWidth: 600 }}>
        <h4>School Link</h4>
        <p>
          Bookmark the link below on your students’ computers. They can use this
          link to sign in by selecting their class. Print their passwords for
          them on the &quot;Students&quot; tab.
        </p>
        <Input
          readOnly
          onFocus={e => e.target.select()}
          value='https://www.schoolapp.com/736ehdkjd72'
          style={{ width: 300 }}
          prefix={<Icon type='link' />}
          size='large' />
        <Divider />
        <h4>Gmail Sign on</h4>
        <p>
          If you added gmail addresses when creating your students’ accounts,
          they will be able to log in using the normal &quot;Sign on with
          Gmail&quot; flow on the home page.
        </p>
      </div>
    </Card>
  )
}

ClassLink.propTypes = {}

export default ClassLink
