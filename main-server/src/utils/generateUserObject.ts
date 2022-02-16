import faker from 'faker';

export default function generateUserObject() {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    identifier: faker.internet.userName(),
    nickname: faker.internet.userName(),
  };

  return user;
}
