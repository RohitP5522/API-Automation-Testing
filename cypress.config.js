const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: 'https://reqres.in',
    env: {
      reqresApiKey: 'reqres-free-v1'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners if needed
    }
  }
});
