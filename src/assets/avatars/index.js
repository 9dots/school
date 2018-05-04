const ctx = require.context('.', true, /\.png$/)

export default ctx.keys().reduce((acc, key) => {
  return { ...acc, [key]: ctx(key) }
}, {})
