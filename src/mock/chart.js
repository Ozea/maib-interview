import faker from 'faker';

export const chartMock = {
  items: [...Array(15).keys()]
    .map((item, index) => ({
      id: index + 1,
      installations: faker.random.number({ min: 50, max: 100 }),
      userGrowth: faker.random.number({ min: 60, max: 110 })
    }))
};