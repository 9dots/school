const ctx = require.context('.', false, /\.png$/)
const pictureData = require('school-schema').picturePasswords
const avatars = pictureData.map(image => ({ ...image, src: ctx(image.path) }))
export default avatars
