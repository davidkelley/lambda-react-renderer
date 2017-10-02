import fs from 'fs';
import Path from 'path';
import faker from 'faker';

import { Render as render } from '../../../handler';

const fixture = fs.readFileSync(Path.join(__dirname, '__fixtures__', 'event.json'), { encoding: 'utf8' });

describe('render()', () => {
  const path = '/';

  describe('when the event is valid', () => {
    it('returns a valid response', (done) => {
      render(fixture, {}, (err, data) => {
        expect(err).toBeNull();
        console.log(data);
        expect(data).toEqual(expect.objectContaining({
          body: expect.any(String),
          statusCode: 200,
          headers: expect.objectContaining({
            'Content-Type': 'text/html',
          }),
        }));
        done()
      });
    });
  });
});
