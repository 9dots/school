import React from 'react'

export default [
  {
    title: 'First Name',
    name: 'name.given',
    required: true,
    description: (
      <span>
        Select the column in your file that contains your students&apos;{' '}
        <b>FIRST NAMES</b>?
      </span>
    )
  },
  {
    title: 'Last Name',
    name: 'name.family',
    required: true,
    description: (
      <span>
        Select the column in your file that contains your students&apos;{' '}
        <b>LAST NAMES</b>?
        <br />
        <small>
          You may select the same column as in the previous step if your last
          and first names appear in the same column.
        </small>
      </span>
    )
  },
  {
    title: 'Email',
    name: 'email',
    description: (
      <span>
        Select the column from your file that has your students&apos;{' '}
        <b>EMAILS</b> in it.
        <br />
        <small>Optional</small>
      </span>
    )
  }
]
