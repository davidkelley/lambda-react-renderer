'use strict';

import faker from 'faker';

import { Buffer } from 'buffer';

jest.mock('http');

import http from 'http';

import Request from '../../../src/lambda/proxy/request';

describe('Request', () => {
  describe('#event', () => {
    const event = { foo: true };

    it('return the correct event', () => {
      const req = new Request(event);
      expect(req.event).toBe(event);
    });
  });

  describe('#body', () => {
    describe('when defined', () => {
      const body = JSON.stringify({ words: faker.random.words() });

      const event = { body };

      it('return the correct body', () => {
        const req = new Request(event);
        expect(req.body).toBe(body);
      });
    });

    describe('when not defined', () => {
      const event = {};

      it('returns an empty body', () => {
        const req = new Request(event);
        expect(req.body).toBe('');
      });
    });
  });

  describe('#method', () => {
    describe('when defined', () => {
      const method = faker.random.arrayElement(['GET', 'POST', 'PUT']);

      const event = { headers: { 'X-Request-Method': method } };

      it('return the correct method', () => {
        const req = new Request(event);
        expect(req.method).toBe(method);
      });
    });

    describe('when not defined', () => {
      const event = { headers: {} };

      it('returns GET method', () => {
        const req = new Request(event);
        expect(req.method).toBe('GET');
      });
    });
  });

  describe('#path', () => {
    describe('when defined', () => {
      const path = faker.internet.url();

      const event = { headers: { 'X-Request-Path': path } };

      it('return the correct path', () => {
        const req = new Request(event);
        expect(req.path).toBe(path);
      });
    });

    describe('when not defined', () => {
      const event = { headers: {} };

      it('returns root path', () => {
        const req = new Request(event);
        expect(req.path).toBe('/');
      });
    });
  });

  describe('#hostname', () => {
    describe('when defined', () => {
      const host = faker.internet.domainName();

      const event = { headers: { 'X-Request-Host': host } };

      it('return the correct hostname', () => {
        const req = new Request(event);
        expect(req.hostname).toBe(host);
      });
    });

    describe('when not defined', () => {
      const event = { headers: {} };

      it('throws an error', () => {
        const req = new Request(event);
        expect(() => { req.hostname }).toThrowError(/missing X-Request-Host/);
      });
    });
  });

  describe('#port', () => {
    describe('when defined', () => {
      const port = faker.random.number().toString();

      const event = { headers: { 'X-Request-Port': port } };

      it('return the correct port', () => {
        const req = new Request(event);
        expect(req.port).toBe(parseInt(port));
      });
    });

    describe('when not defined', () => {
      const event = { headers: {} };

      it('returns default port 80', () => {
        const req = new Request(event);
        expect(req.port).toBe(80);
      });
    });
  });

  describe('#contentType', () => {
    describe('when defined', () => {
      const type = 'text/html';

      const event = { headers: { 'Content-Type': type } };

      it('return the correct header', () => {
        const req = new Request(event);
        expect(req.contentType).toBe(type);
      });
    });

    describe('when not defined', () => {
      const event = { headers: {} };

      it('returns default type of application/json', () => {
        const req = new Request(event);
        expect(req.contentType).toBe('application/json');
      });
    });
  });

  describe('#options', () => {
    const body = JSON.stringify({ words: faker.random.words() });

    const method = faker.random.arrayElement(['GET', 'POST', 'PUT']);

    const path = faker.internet.url();

    const host = faker.internet.domainName();

    const port = faker.random.number().toString();

    const type = 'text/html';

    const headers = {
      'X-Request-Method': method,
      'X-Request-Path': path,
      'X-Request-Host': host,
      'X-Request-Port': port,
      'Content-Type': type,
    }

    const event = {
      body,
      headers,
    }

    it('returns an expected options set', () => {
      const req = new Request(event);
      expect(req.options).toMatchObject({
        path,
        method,
        hostname: host,
        port: parseInt(port),
        headers: {
          'Content-Type': type,
          'Content-Length': Buffer.byteLength(body),
        }
      });
    });
  });

  describe('#send', () => {
    describe('when the request succeeds', () => {
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
      }

      const event = {
        body,
        headers,
      }

      beforeEach(() => {
        http.__setResp(200);
        http.__setHeaders({});
        http.__setBody(JSON.stringify({ ok: true }));
      })

      it('passes through the correct response', async () => {
        const req = new Request(event);
        const res = await req.send();
        expect(res).toMatchObject({
          statusCode: 200,
          headers: {},
          body: JSON.stringify({ ok: true }),
        });
      })
    })
  });
})
