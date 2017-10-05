import { Helmet } from 'react-helmet';

export default function(props) {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();

  return (`
    <html ${htmlAttrs}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <style id="critical-css" type="text/css">${props.css.join('')}</style>
      </head>
      <body ${bodyAttrs}>
        <div id="app" data-jshook="app-body">${props.renderedHtml}</div>
        ${props.assets.js.map(a => `<script src="/assets/${a}"></script>`)}
      </body>
    </html>
  `);
}
