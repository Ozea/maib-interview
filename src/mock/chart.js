import faker from 'faker';

const pageNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

export const chartMock = {
  items: [...Array(9).keys()]
    .map((item, index) => ({
      id: index + 1,
      page: `Page ${pageNames[index]}`,
      installations: faker.random.number({ min: 50, max: 200 }),
      userGrowth: faker.random.number({ min: 60, max: 210 })
    }))
};