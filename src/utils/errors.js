export const messages = {
  displayName_too_long: 'Too many characters'
}

export const errorToMessage = msg => {
  return messages[msg] || msg
}
