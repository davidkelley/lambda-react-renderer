import Request from './request';

export default async function (event, context, cb) {
  try {
    const request = new Request(event);
    const data = await request.send();
    cb(null, data);
  } catch (err) {
    cb(err);
  }
};
