import Client from './client';

export default class {
  constructor(event = {}) {
    this.event = event;
  }

  get assets() {
    return this.event.assets;
  }

  get params() {
    return this.event.queryStringParameters || {};
  }

  get location() {
    return this.event.path || '/';
  }

  get client() {
    return new Client(this);
  }

  async send() {
    try {
      return await this.client.render();
    } catch (err) {
      throw err;
    }
  }
}
