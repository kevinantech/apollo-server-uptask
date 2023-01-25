const typeDefs = `

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
		token: String!
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
	
	input GetTasksInput {
		projectId: ID!
	}

	input CreateTaskInput {
		name: String!
		projectId: ID!
	}
	
	input UpdateTaskInput {
		ID: ID!
		name: String
		status: Boolean!
	}
	
	type Task {
		ID: ID!
		name: String
		status: Boolean
		projectId: ID
	}

	# RESOLVERS

	type Query {

		# PROJECT
		GetProjects: [Project]

		# TASK
		GetTasks(input: GetTasksInput): [Task]
	}

	type Mutation {

		# USER
		CreateUser(input: CreateUserInput): Response
		AuthUser(input: AuthUserInput): Token

		# PROJECT
		CreateProject(input: CreateProjectInput): Project
		UpdateProject(input: UpdateProjectInput): Project
		DeleteProject(ID: ID!): Response 

		# TASK
		CreateTask(input: CreateTaskInput): Task
		UpdateTask(input: UpdateTaskInput): Task
		DeleteTask(ID: ID!): Response

	}
`;
export { typeDefs };