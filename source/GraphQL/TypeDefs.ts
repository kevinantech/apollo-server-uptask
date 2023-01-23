const TypeDefs = `

    # RESPONSE TYPES
    
    type Response {
        ID: ID!
    }
    
    # USER
    
    input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }
    
    input AuthUserInput {
        email: String!
        password: String!
    }
    
    type Token {
        token: String
    }
    
    # PROJECT
    
    input CreateProjectInput {
        name: String!
    }

    input UpdateProjectInput {
        ID: ID!
        name: String!
    }

    type Project {
        ID: ID!
        name: String
    }

    # TASK
    
    input CreateTaskInput {
        name: String!
        project_id: ID!
    }
    
    input UpdateTaskInput {
        ID: ID!
        name: String
        status: Boolean!
        project_id: ID
    }
    
    type Task {
        ID: ID
        name: String
        status: Boolean
        project_id: ID
    }

    # RESOLVERS

    type Query {

        # PROJECT
        GetProjects: [Project]

        # TASK
        
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
        UpdateTask(input: UpdateTaskInput): Task

    }
`;
export {TypeDefs};