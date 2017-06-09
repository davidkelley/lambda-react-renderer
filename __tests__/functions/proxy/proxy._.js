'use strict';

import faker from 'faker';

import { Buffer } from 'buffer';

jest.mock('http');

import http from 'http';

const mod = require('../../../handler');

const jestPlugin = require('serverless-jest-plugin');

const lambdaWrapper = jestPlugin.lambdaWrapper;

const wrapped = lambdaWrapper.wrap(mod, { handler: 'Proxy' });

describe('λ.Proxy', () => {
  describe('a valid request', () => {
    const body = JSON.stringify({ words: faker.random.words() });

    const method = faker.random.arrayElement(['GET', 'POST', 'PUT']);

    const path = faker.internet.url();

    const host = faker.internet.domainName();

    const port = faker.random.arrayElement([1234,235,4567]);

    const type = 'text/html';

    const headers = {
      'X-Request-Method': method,
      'X-Request-Path': path,
      'X-Request-Host': host,
      'X-Request-Port': port,
      'Content-Type': type,
    };

    const event = {
      body,
      headers,
    };

    beforeEach(() => {
      http.__setResp(200);
      http.__setHeaders({});
      http.__setBody(JSON.stringify({ ok: true }));
    });

    it('passes through the correct response', () => {
      wrapped.run(event, (err, data) => {
        expect(err).toBeNull();
        expect(data).toMatchObject({
          statusCode: 200,
          headers: {},
          body: JSON.stringify({ ok: true }),
        });
      });
    });
  });
});
