const typeDefs = `

    type Project {
        name: String
        id: ID
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
    
    input ProjectInput {
        name: String!
    }
    
    type Query {
        projects: [Project]
    }

    type Mutation {
        createUser(input: UserInput): String
        authUser(input: AuthUserInput): Token
        createProject(input: ProjectInput): Project
        updateProject(id: ID!, input: ProjectInput): Project
        deleteProject(id: ID!): String
    }
`;
export default typeDefs;