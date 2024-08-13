import express from 'express'
import * as osc from 'node-osc'

import oscMin from 'osc-min'

import dgram from 'dgram'

const udp = dgram.createSocket('udp4')

// console.log(osc)

const app = express()
app.use(express.static('public'))

const vdmx = {
  ip: '192.168.0.30',
  port: 9000
}

const appPort = 41234


const oscServer = new osc.Server(vdmx.port, vdmx.ip, () => {
  console.log('OSC server listening')
})
console.log(oscServer)

const oscClient = new osc.Client(vdmx.ip, 41234)
console.log(oscClient)

const buf = oscMin.toBuffer({
  address: '/test',
  args: 1
})

// udp.send(buf, 0, buf.length, appPort, vdmx.ip)

const fx = [
  'interstellar sphere',
  'organelles',
  'black hole',
  'triple rotate',
  'hexagonal lattice',
  'duo glitch',
  'bizmuth',
  'ascii iris'
]

oscServer.on('message', msg => {
  console.log(msg)

  const [ addr, val ] = msg

  if (addr === '/fx/random_preset') {
    const randIndex = Math.floor( Math.random() * fx.length)
    const randPick = fx[ randIndex ]
    const randAddr = '/overlay/fx_index'
    
    console.log(randAddr, randIndex)

    // oscClient.send('/overlay/fx_index', randIndex, () => {})

    const buf = oscMin.toBuffer({
      address: randAddr,
      args: randIndex
    })

    console.log(buf)

    udp.send(buf, 0, buf.length, appPort, vdmx.ip)
  }
})

app.get('/osc', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
  // countdown(res, 10)

  oscServer.on('message', msg => {
    // console.log('osc message:', msg)

    res.write("data: " + `${msg}` + "\n\n")
  })
})





function countdown(res, count) {
  res.write("data: " + count + "\n\n")
  if (count)
    setTimeout(() => countdown(res, count-1), 1000)
  else
    res.end()
}


app.listen(appPort, () => console.log(`SSE app listening on port ${appPort}!`))




