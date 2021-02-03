import faker from 'faker';

export const tableMock = {
  items: [...Array(20).keys()]
    .map((item, index) => ({
      id: index + 1,
      date: faker.date.between(new Date('23/08/2018'), new Date('21/09/2018')),
      newUsers: faker.random.number({ min: 20, max: 45 }),
      otherData: faker.random.word()
    }))
};