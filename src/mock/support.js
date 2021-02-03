import faker from 'faker';

export const supportMock = {
  items: [...Array(20).keys()]
    .map((item, index) => ({
      id: index + 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      idnp: `200${faker.random.number({ min: 10000, max: 99999 })}8${faker.random.number({ min: 10000, max: 99999 })}`,
      phoneNumber: `+373 ${faker.phone.phoneNumber('### ######')}`,
      panCard: faker.finance.creditCardNumber('Visa'),
      lastTransaction: faker.date.recent()
    }))
};