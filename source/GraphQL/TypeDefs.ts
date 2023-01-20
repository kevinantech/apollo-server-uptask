const TypeDefs = `

    type Project {
        ID: ID!
        name: String!
        created: String!
    }
    
    input ProjectInput {
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
    
    type ID_Answer {
        ID: ID!
    }

    type Token {
        token: String!
    }

    type ProjectUpdated {
        name: String!
    }

    type Query {
        AuthUser(input: AuthUserInput): Token
        GetProjects: [Project]
    }

    type Mutation {
        CreateUser(input: UserInput!): ID_Answer
        CreateProject(name: String!): ID_Answer
        UpdateProject(input: ProjectInput!): ProjectUpdated
        DeleteProject(ID: ID!): String
    }
`;
export {TypeDefs};