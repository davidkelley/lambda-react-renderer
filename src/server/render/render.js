import fs from 'fs';
import Path from 'path';

import Request from './request';

const readAssets = () => {
  try {
    const path = Path.join(__dirname, 'stats.json');
    const stats = fs.readFileSync(path, { encoding: 'utf8' });
    return JSON.parse(stats);
  } catch (e) {
    return {};
  }
};

const STATS = readAssets();

export default async function (event, context, cb) {
  try {
    if (!event.assets) event.assets = readAssets();
    const request = new Request(event);
    const data = await request.send();
    cb(null, data);
  } catch (err) {
    cb(err);
  }
};
