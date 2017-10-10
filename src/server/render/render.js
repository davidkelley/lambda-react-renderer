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
    const data = event;
    if (!event.assets) data.assets = STATS;
    const request = new Request(data);
    const response = await request.send();
    cb(null, response);
  } catch (err) {
    cb(err);
  }
};
