const typeDefs = `

    type Project {
        name: String
        id: ID
    }

    type Token {
        token: String
    }

    type Query {
        projects: [Project]
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

    input ProjectInput {
        name: String!
    }

    type Mutation {
        createUser(input: UserInput): String
        authUser(input: AuthUserInput): Token
        createProject(input: ProjectInput): Project
    }
`;
export default typeDefs;