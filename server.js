import express from 'express'
import * as osc from 'node-osc'

console.log(osc)

const app = express()
app.use(express.static('public'))

app.get('/countdown', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
  countdown(res, 10)
})

const vdmx = {
  ip: '192.168.0.30',
  port: 9000
}

const oscServer = new osc.Server(vdmx.port, vdmx.ip, () => {
  console.log('OSC server listening')
})

oscServer.on('message', msg => console.log('osc message:', msg))

function countdown(res, count) {
  res.write("data: " + count + "\n\n")
  if (count)
    setTimeout(() => countdown(res, count-1), 1000)
  else
    res.end()
}

app.listen(3000, () => console.log('SSE app listening on port 3000!'))