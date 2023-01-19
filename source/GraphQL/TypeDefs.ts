const TypeDefs = `
    type Token {
        token: String!
    }

    type ID_Answer {
        ID: ID!
    }

    type Project {
        ID: ID!
        name: String!
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

    type Query {
        AuthUser(input: AuthUserInput): Token
        GetProjects(AUTHOR_ID: ID): [Project]
    }

    type Mutation {
        CreateUser(input: UserInput): ID_Answer
        
    }
`;
export {TypeDefs};