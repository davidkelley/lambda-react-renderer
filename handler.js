'use strict';
const devToolkit = require('dev-toolkit').default;

module.exports.render = (event, context, callback) => {
  console.log('Pre-rendering using `dev-toolkit` & `serverless`');
  global.serverlessSettings = {
    event: event,
    context: context,
    callback: callback,
  };

  devToolkit({
    // The command that would normally be run via the command-line (`dev-toolkit preRender`)
    command: 'preRender',
    // Environment variables (which might not be available depending on your setup) can be passed
    // separately as an `envs`-object, they will be transformed into environment variables on the fly.
    envs: {
      NODE_ENV: 'production',
      MY_CUSTOM_ENV: 'foo-from-handler',
    },
  });
};

// Event Gateway  Event API  listening on: http://localhost:4000
// Event Gateway  Config API listening on: http://localhost:4001
// Serverless     Emulator   listening on: http://localhost:4002
