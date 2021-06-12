const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Book } = require("../models");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id)
					.select("-__v -password")
					.populate("bookCount")
					.populate("savedBooks");

				return user;
			}

			throw new AuthenticationError("Not logged in");
		},

		books: async (parent, args) => {
			return Book.find({ bookId: args.bookId });
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);
			return { token, user };
		},
		saveBook: async (parent, args, context) => {
			if (context.user) {
				const book = await Book.findOne({
					...args,
					username: context.user.username,
				});

				await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $push: { savedBooks: book.bookId } },
					{ new: true }
				);

				return book;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		removeBook: async (parent, args, context) => {
			if (context.user) {
				const book = await Book.findOneAndDelete({
					bookId: args.bookId,
				});

				return book;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
	},
};

module.exports = resolvers;
