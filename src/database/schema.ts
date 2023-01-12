const typeDefs = `
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    type Mutation {
        createUser(input: UserInput): String
    }
`;
export default typeDefs;