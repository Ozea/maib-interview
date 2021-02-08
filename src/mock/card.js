import faker from 'faker';

export const cardMock = {
  data: {
    monthlyInstallation: faker.random.number({ min: 100, max: 10000 }),
    prevMonthComparison: faker.random.number({ min: 0, max: 100 })
  }
};