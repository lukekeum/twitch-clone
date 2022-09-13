import TestUtils from '@src/utils/tests/utils.class';
import { gql } from 'apollo-server-fastify';

describe('QUERY version', () => {
  const { query } = TestUtils.getGraphqlTestingTool();

  const VERSION = gql`
    query {
      version
    }
  `;

  it('version is equal to environmental variable', async () => {
    const {
      data: { version },
    } = await query({ query: VERSION });

    expect(version).toStrictEqual(process.env.VERSION);
  });
});
