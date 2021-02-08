import { supportMock } from '../mock/support';
import { chartMock } from '../mock/chart';
import { tableMock } from '../mock/table';
import { cardMock } from '../mock/card';
import { Server } from 'miragejs';
import faker from 'faker';

export function makeServer() {
  new Server({
    routes() {
      this.namespace = 'api';
      this.timing = faker.random.number({ min: 2, max: 15000 });

      this.get('/chart', () => (chartMock))

      this.get('/table', () => (tableMock))

      this.get('/card', () => (cardMock))

      this.get('/support', () => (supportMock))
    }
  });
}