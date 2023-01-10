import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

const typeDefs = `
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`;

const resolvers = {
    Query: {
      books: () => books,
    },
  };

const Server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(Server, {
    listen: { port: 4000 },
  });
  
console.log(`🚀  Server ready at: ${url}`);