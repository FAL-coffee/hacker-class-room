const admin = require("firebase-admin");
const cypressFirebasePlugin = require("cypress-firebase").plugin;

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfig) => {
  const extendedConfig = cypressFirebasePlugin(on, config, admin);

  // Add other plugins/tasks such as code coverage here

  return extendedConfig;
};
