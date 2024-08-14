import express from 'express'
import * as osc from 'node-osc'
import oscMin from 'osc-min'
import dgram from 'dgram'

const udp = dgram.createSocket('udp4')

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

let lastFxIndex = null

let currentFx = {
  name: null,
  index: null
}

app.get('/osc', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  oscServer.on('message', msg => {
    const [ addr, val ] = msg

    if (addr === '/fx/random_preset') {
      let randIndex;

      do {
        randIndex = Math.floor( Math.random() * fx.length)
      }
      while (randIndex === lastFxIndex)

      lastFxIndex = randIndex

      const randPick = fx[ randIndex ]
      const randAddr = '/overlay/fx_index'
      
      const buf = oscMin.toBuffer({
        address: randAddr,
        args: randIndex
      })


      res.write("data: " + `/preset/${ fx[randIndex] }` + "\n\n")

      udp.send(buf, 0, buf.length, appPort, vdmx.ip)
    
    } else {

      res.write("data: " + `${msg}` + "\n\n")

    }

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




