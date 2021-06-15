const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/book-search", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

module.exports = mongoose.connection;

VjgdpZgu4YifVww

mongodb+srv://flokamp:VjgdpZgu4YifVww@cluster0.9ipuq.mongodb.net/google_books?retryWrites=true&w=majority

mongodb+srv://flokamp:VjgdpZgu4YifVww@cluster0.9ipuq.mongodb.net/book_search?retryWrites=true&w=majority