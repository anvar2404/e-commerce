import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

import Catalog from './models/Catalog.model'
import mongooseConnection from './services/mongoose'

mongooseConnection.myConnect()

// eslint-disable-next-line import/order
const { readFile, writeFile } = require('fs').promises

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  // eslint-disable-next-line no-console
  console.log(Root)
} catch (ex) {
  // eslint-disable-next-line no-console
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const read = () => {
  return readFile(`${__dirname}/logs.json`).then((info) => JSON.parse(info))
}

const write = (fileName, content) => {
  return writeFile(`${__dirname}/${fileName}.json`, JSON.stringify(content, 1, 2))
}

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/catalog', async (req, res) => {
  const catalog = await Catalog.find({})
  res.json(catalog)
})

server.get('/api/v1/currency', async (req, res) => {
  const { data: rates } = await axios('https://api.exchangeratesapi.io/latest?symbols=USD,CAD')
  res.json(rates.rates)
})

server.post('/api/v1/logs', async (req, res) => {
  const logs = await read()
  let updatedLogs = []
  switch (req.body.type) {
    case 'ADD_TO_CART':
      updatedLogs = [...logs, { time: +new Date(), event: `Добавлен товар ${req.body.title}` }]
      break
    case 'REMOVE_FROM_CART':
      updatedLogs = [...logs, { time: +new Date(), event: `Удален товар ${req.body.title}` }]
      break
    case 'SET_BASE':
      updatedLogs = [
        ...logs,
        { time: +new Date(), event: `Валюта сменилась с ${req.body.base} на ${req.body.newBase}` }
      ]
      break
    default:
      updatedLogs = [...logs]
  }
  await write('logs', updatedLogs)
  res.json({ status: 'ok' })
})

server.get('/api/v1/logs', async (req, res) => {
  const logs = await read()
  res.json(logs)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Boilerplate'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
// eslint-disable-next-line no-console
console.log(`Serving at http://localhost:${port}`)
