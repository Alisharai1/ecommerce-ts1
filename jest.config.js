module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // or 'jsdom' for browser-like environments
  testMatch: ['<rootDir>/test/**/*.test.ts'], // Example: finds files ending in .test.ts in src/

};