const typeDefs = `
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }

    type Token {
        token: String
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    input AuthUserInput {
        email: String!
        password: String!
    }

    type Mutation {
        createUser(input: UserInput): String
        authUser(input: AuthUserInput): Token
    }
`;
export default typeDefs;