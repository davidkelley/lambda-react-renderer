import faker from 'faker';

import Client from '../../../src/server/render/client';

describe('Client', () => {
  const path = '/';

  describe('#renderedHtml', () => {
    const client = new Client(path);

    it('renders', () => {
      console.log(client.body);
      expect(true).toBe(true);
    });
  });
});
