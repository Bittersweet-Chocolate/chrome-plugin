/*
 * @Author: czh-mac
 * @Date: 2023-08-16 10:39
 * @LastEditTime: 2023-08-23 13:33
 * @Description: 头部注释
 */
const http = require('http')
const fs = require('node:fs/promises')
const options = {
  hostname: 'gezizm.com',
  path: '/api/common/hot',
  method: 'POST'
}

const req = http.request(options, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    writeFile(data)
  })
})

req.on('error', (error) => {
  console.error('Error:', error)
})
req.end()

async function writeFile(val) {
  try {
    let buffer = Buffer.from(val)
    await fs.writeFile('./json/hot.json', buffer)
  } catch (e) {
    console.error(e)
  }
}
