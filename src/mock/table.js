import faker from 'faker';

export function generateTableMock(startDate, endDate) {
  return {
    items: [...Array(10).keys()]
      .map((item, index) => ({
        id: index + 1,
        date: faker.date.between(startDate, endDate),
        newUsers: faker.random.number({ min: 20, max: 45 }),
        otherData: faker.random.word()
      }))
  };
}