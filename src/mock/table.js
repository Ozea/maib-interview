import faker from 'faker';

export const tableMock = {
  items: [...Array(10).keys()]
    .map((item, index) => ({
      id: index + 1,
      date: faker.date.between('2018-08-23', '2018-09-22'),
      newUsers: faker.random.number({ min: 20, max: 45 }),
      otherData: faker.random.word()
    }))
};