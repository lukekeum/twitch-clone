import generateSchema from './schema';

export default function getGraphqlServerOptions() {
  const schema = generateSchema();

  const graphqlServerOption = {
    schema,
  };

  return graphqlServerOption;
}
