export default class Client {
  constructor(path) {
    this.path = path;
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

  render() {
    return new Promise((resolve, reject) => {
      const { body } = this;
      resolve({ statusCode: 200, body });
    });
  }
}
