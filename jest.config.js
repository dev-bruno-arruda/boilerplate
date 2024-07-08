module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.spec.ts', // Exclui arquivos de testes da cobertura
    '!**/node_modules/**', // Exclui node_modules da cobertura
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
  testEnvironment: 'node',
};
