const config = require('./jest.config')
config.testMatch = ['**/*.test.ts']
config.collectCoverageFrom = [
  ...config.collectCoverageFrom,
  '!<rootDir>/src/**/*.spec.ts',
]
module.exports = config
