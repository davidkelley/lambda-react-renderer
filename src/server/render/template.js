export default function(props) {
  const htmlAttrs = props.head.htmlAttributes.toString();
  const bodyAttrs = props.head.bodyAttributes.toString();

  return (`
    <!DOCTYPE html>
    <html>
      <head>
        ${props.head.title.toString()}
        ${props.head.meta.toString()}
        ${props.head.link.toString()}
        <style id="critical-css" type="text/css">${props.css.join('')}</style>
      </head>
      <body>
        <div id="app" data-jshook="app-body">${props.renderedHtml}</div>
        ${props.assets.js.map(a => `<script src="/assets/${a}"></script>`)}
      </body>
    </html>
  `);
}
