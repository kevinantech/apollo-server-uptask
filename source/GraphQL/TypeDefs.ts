const TypeDefs = `
    
    # INPUTS

    input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }
    
    input AuthUserInput {
        email: String!
        password: String!
    }

    input CreateProjectInput {
        name: String!
    }

    input UpdateProjectInput {
        ID: ID!
        name: String!
    }

    input CreateTaskInput {
        name: String!
        PROJECT_ID: ID!
    }
    
    
    # RESPONSE TYPES

    type Response {
        ID: ID
    }

    type Token {
        token: String
    }

    type Project {
        ID: ID
        name: String
    }

    type Task {
        ID: ID
        name: String
        status: Boolean
        PROJECT_ID: ID
    }


    # RESOLVERS
    
    type Query {
        GetProjects: [Project]
    }

    type Mutation {

        # USER
        CreateUser(input: CreateUserInput!): Response
        AuthUser(input: AuthUserInput!): Token

        # PROJECT
        CreateProject(input: CreateProjectInput!): Project
        UpdateProject(input: UpdateProjectInput!): Project
        DeleteProject(ID: ID!): Response 

        # TASK
        CreateTask(input: CreateTaskInput): Task

    }
`;
export {TypeDefs};