'use strict'
const path = require('path')
const exec = require('child_process').exec

const options = {
  cwd: path.join(__dirname, '..', "node_modules")
}

exec('npm link lambo-ui', options, function (err, stdout, stderr) {
  if (!err) {
    console.log("link lambo-ui success")
  } else {
    console.error('fail to link lambo-ui,checkout for run cmd \'npm link\' under lambo-ui project first ')
  }
})
