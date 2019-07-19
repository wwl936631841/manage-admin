var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"uat"',
  ENV_CONFIG:'"uat"',
})
