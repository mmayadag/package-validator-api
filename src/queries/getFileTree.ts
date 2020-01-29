const getFileTree = /* GraphQL */ `
  query getFileTree($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      object(expression: "master:") {
        ... on Tree {
          id
          entries {
            name
            type
            object {
              ... on Blob {
                id
                text
              }
            }
          }
        }
      }
    }
  }
`;
export default getFileTree;
