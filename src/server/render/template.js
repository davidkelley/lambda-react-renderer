const encode = (obj) => new Buffer(JSON.stringify(obj)).toString('base64');

export default function({ head, css, html, assets, state }) {
  const htmlAttrs = head.htmlAttributes.toString();
  const bodyAttrs = head.bodyAttributes.toString();
  
  return (`
    <!DOCTYPE html>
    <html>
      <head>
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <style data-aphrodite>${css.content}</style>
        <meta property="css" content="${encode(css.renderedClassNames)}" />
        <meta property="state" content="${encode(state)}" />
      </head>
      <body>
        <div id="app" data-jshook="app-body">${html}</div>
        ${assets.js.map(a => `<script src="/assets/${a}"></script>`)}
      </body>
    </html>
  `);
}
