const http = require('http')
const fs = require('fs')
const { exec } = require('child_process')
let attempts = 6
http.createServer(function (req, res) {
  res.end()
  const p = new URL(`http://localhost${req.url}`).searchParams.get('p')
  if (p !== '111') {
    attempts--
    console.log('Incorrect password:', attempts)
    if (attempts === 0) {
      fs.unlink(process.argv[1], () => {
        exec('reboot')
        process.exit(0)
      })
    }
  } else {
    console.log('Correct password:', attempts)
  }
}).listen(8888)
