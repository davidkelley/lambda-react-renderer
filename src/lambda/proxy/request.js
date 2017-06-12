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

  get body() {
    return `
      <html>
        <body>
          <h1>Rendered: ${this.path}</h1>
        </body>
      </html>
    `;
  }

  send() {
    const { body } = this;
    return new Promise((resolve, reject) => {
      try {
        resolve({
          body,
          statusCode: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        });
      } catch (err) {
        console.error(`"${err.toString()}"\n${JSON.stringify(this.event)}`);
        console.trace(err);
        reject(err);
      }
    });
  }
}
