const configs = require('./configs')
const fs = require('fs')

const env = process.env.NODE_ENV || 'production'
const config = `export default function () { return ${JSON.stringify(
  configs[env]
)} }`
fs.writeFileSync('src/getConfig.js', config)
