import Request from './request';

export default async function (event, context, cb) {
  try {
    // console.log(JSON.stringify(event));
    const request = new Request(event);
    const data = await request.send();
    cb(null, data);
  } catch (err) {
    cb(err);
  }
};
