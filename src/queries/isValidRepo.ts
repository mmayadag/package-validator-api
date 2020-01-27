const isValidRepo = /* GraphQL */ `
query isValidRepo($owner:String! , $repo:String!){
    repository(owner: $owner, name: $repo) {
        name      
    }
}`;

export default isValidRepo;
