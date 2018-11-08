const express = require('express')
const graphQLHTTP = require('express-graphql')
const path = require('path')
const http = require('http')
const schema = require('./data/schema').schema

const SERVER_PORT = process.env.PORT || 8080

const app = express()

// Point static path to dist
const dist = path.join(__dirname, '..', 'dist')
app.use('/', express.static(dist))
app.use('/dist', express.static(dist))

// Setup GraphQL endpoint
app.use(
  '/graphql',
  graphQLHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
  })
)

/** Get port from environment and store in Express. */
app.set('port', SERVER_PORT)

/** Create HTTP server. */
const server = http.createServer(app)
/** Listen on provided port, on all network interfaces. */
server.listen(SERVER_PORT, () => console.log(`Server Running on port ${SERVER_PORT}`))
