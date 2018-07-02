export const messages = {
  description_too_long: 'Must be less than 250 characters',
  displayName_too_long: 'Must be less than 40 characters',
  displayName_too_short: 'Must be at least 2 characters',
  invalid_firebase_ref: 'Must be at least 6 characters',
  password_too_short: 'Must be at least 4 characters',
  invalid_credentials: 'Incorrect password',
  invalid_username: 'Invalid username',
  missing_required_field: 'Required',
  username_taken: 'Username taken',
  invalid_url: 'Invalid URL'
}

export const errorToMessage = (msg, overWrite) => {
  return overWrite || messages[msg] || msg
}
