import Client from './client';

export default class {
  constructor(event = {}) {
    this.event = event;
  }

  get querystring() {
    return this.event.queryStringParameters || {};
  }

  get path() {
    const path = this.event.path || '/';
    const { querystring } = this;
    const mapper = key => `${key}=${querystring[key]}`;
    const query = Object.keys(querystring).map(mapper).join('&');
    return `${path}?${query}`;
  }

  get client() {
    return new Client(this.path);
  }

  async send() {
    try {
      return await this.client.render();
    } catch (err) {
      throw err;
    }
  }
}
