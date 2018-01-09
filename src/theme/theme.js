const lessToJs = require('less-vars-to-js')
const fs = require('fs')

const paletteLess = fs.readFileSync('src/theme/colors.less', 'utf8')
const palette = lessToJs(paletteLess)

module.exports = {
  'primary-color': palette['@blue'],
  'layout-header-background': palette['@blue']
}
