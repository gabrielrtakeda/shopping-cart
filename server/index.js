import express from 'express'
import graphQLHTTP from 'express-graphql'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { schema } from './data/schema'

const APP_PORT = 3000

// Serve the Relay app
const compiler = webpack({
  mode: 'development',
  entry: ['whatwg-fetch', path.resolve(__dirname, '..', 'client', 'index.js')],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: '/'
  }
})

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/',
  stats: { colors: true }
})

// Serve static resources
app.use('/', express.static(path.resolve(__dirname, '..', 'public')))

// Setup GraphQL endpoint
app.use(
  '/graphql',
  graphQLHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
  })
)

app.listen(APP_PORT, () => {
  console.info(`App is now running on http://localhost:${APP_PORT}`)
})
