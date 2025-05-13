const { defineConfig } = require('cypress');

module.exports = defineConfig({
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
