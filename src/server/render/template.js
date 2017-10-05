export default function({ head, css, html, assets }) {
  const htmlAttrs = head.htmlAttributes.toString();
  const bodyAttrs = head.bodyAttributes.toString();
  const rehydratedStyles = new Buffer(JSON.stringify(css.renderedClassNames)).toString('base64');

  return (`
    <!DOCTYPE html>
    <html>
      <head>
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <style data-aphrodite>${css.content}</style>
        <meta property="css" content="${rehydratedStyles}" />
      </head>
      <body>
        <div id="app" data-jshook="app-body">${html}</div>
        ${assets.js.map(a => `<script src="/assets/${a}"></script>`)}
      </body>
    </html>
  `);
}
