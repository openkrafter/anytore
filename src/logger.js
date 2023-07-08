import pino from 'pino'

// level: error, info or trace
const logger = pino({
  browser: { asObject: true },
  level: 'trace',
})

export default logger
