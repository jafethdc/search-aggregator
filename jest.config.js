const path = require('path')

module.exports = {
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'app/javascript'),
    path.join(__dirname, 'app/assets'),
  ],
  collectCoverageFrom: [
    'app/javascript/components/**/*.js?(x)',
    'app/javascript/lib/**/*.js?(x)',
    '!app/javascript/packs/polyfills.js',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$':
      '<rootDir>/app/javascript/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/app/javascript/testSetup.js'],
  testMatch: ['<rootDir>/app/javascript/**/*.spec.js?(x)'],
  verbose: true,
}
