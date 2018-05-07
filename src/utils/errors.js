export const messages = {
  displayName_too_long: 'Must be less than 25 characters',
  displayName_too_short: 'Must be at least 2 characters',
  invalid_firebase_ref: 'Must be at least 6 characters',
  password_too_short: 'Must be at least 4 characters',
  invalid_credentials: 'Incorrect password',
  missing_required_field: 'Required'
}

export const errorToMessage = (msg, overWrite) => {
  return overWrite || messages[msg] || msg
}
