'use strict';
console.log('--1--');

module.exports.render = (event, context, callback) => {
  console.log('--2--');
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

// Event Gateway  Event API  listening on: http://localhost:4000
// Event Gateway  Config API listening on: http://localhost:4001
// Serverless     Emulator   listening on: http://localhost:4002
