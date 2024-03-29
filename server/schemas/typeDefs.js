// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		bookCount: Int
		savedBooks: [Book]
	}

	type Query {
		me: User
	}

	input bookInput {
		bookId: String
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}

	type Book {
		bookId: String
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveBook(input: bookInput!): User
		removeBook(bookId: String!): User
	}
`;

module.exports = typeDefs;
