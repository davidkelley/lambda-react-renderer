export default class {
  constructor(event = {}) {
    this.event = event;
  }

  get path() {
    const { path, queryStringParameters } = this.event;
    const query = Object.keys(queryStringParameters).map((conc, key) => {
      return `${key}=${queryStringParameters[key]}`;
    }).join('&');
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
    const { body, path } = this;
    return new Promise((resolve, reject) => {
      try {
        resolve({
          body,
          statusCode: 200,
          headers: {},
        });
      } catch (err) {
        console.error(`"${err.toString()}"\n${JSON.stringify(this.event)}`);
        console.trace(err);
        reject(err);
      }
    });
  }
}
