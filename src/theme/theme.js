const palette = require('./vars/palette.js')
const vars = require('./vars/vars.js')

module.exports = {
  'font-family': vars['@font-family'],
  'heading-color': vars['@heading-color'],
  'error-color': palette['@red'],
  'success-color': palette['@green'],
  'primary-color': palette['@blue'],
  'layout-header-background': palette['@blue'],
  'layout-sider-background': 'white',
  'body-background': palette['@off-white'],
  'layout-body-background': palette['@off-white']
}
