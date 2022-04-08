const { nanoid } = require("nanoid");
const bookshelf = require("./book");

/**
 * Handler For APIs Bookshelf
 */
const mainPathHandler = (request, h) => {
	const response = h.response({
		message: "Welcome In APIs Bookshelf",
		author: "Refaldy Rizky Karim",
	});
	response.code(200);

	return response;
};

const createBookHandler = (request, h) => {
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
	const id = nanoid(7);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	//Condition For Inserting Data
	if (!name) {
		return h
			.response({
				message: "Name is required",
				status: "error",
			})
			.code(400);
	}

	if (readPage > pageCount) {
		return h
			.response({
				message: "Read Page cannot be greater than Page Count",
				status: "error",
			})
			.code(400);
	}

	var newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
		insertedAt,
		updatedAt,
	};
	bookshelf.push(newBook);

	const isSuccess = bookshelf.filter(book => book.id === id).length > 0;

	if (isSuccess) {
		return h
			.response({
				message: "Book has been created",
				status: "success",
				data: {
					bookId: id,
				},
			})
			.code(201);
	}

	return h
		.response({
			message: "Book has not been created",
			status: "error",
		})
		.code(500);
};

const getBookHandler = (request, h) => {
	const arrayOfBook = [];

	bookshelf.forEach(element => {
		const response = {
			id: element.id,
			name: element.name,
			publisher: element.publisher,
		};
		arrayOfBook.push(response);
	});

	return h.response({
		message: "book has been retrieved",
		status: "success",
		data: {
			books: arrayOfBook,
		},
	});
};

const detailBookHandler = (request, h) => {
	const { id } = request.params;

	const bookDetail = bookshelf.filter(book => book.id === id)[0];

	if (bookDetail !== undefined) {
		return {
			status: "success",
			message: "Book has been retrieved",
			data: {
				book: bookDetail,
			},
		};
	}

	return h
		.response({
			status: "error",
			message: "Book has not been retrieved",
		})
		.code(500);
};

const editBookHandler = (request, h) => {
	const { id } = request.params;
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
	const updatedAt = new Date().toISOString();

	//Condition For Inserting Data
	if (!name) {
		return h
			.response({
				message: "Name is required",
				status: "error",
			})
			.code(400);
	}

	if (readPage > pageCount) {
		return h
			.response({
				message: "Read Page cannot be greater than Page Count",
				status: "error",
			})
			.code(400);
	}

	const index = bookshelf.findIndex(book => book.id === id);

	if (index !== -1) {
		bookshelf[index] = {
			...bookshelf[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			updatedAt,
		};

		return h
			.response({
				message: "Book has been updated",
				status: "success",
				data: {
					bookId: id,
				},
			})
			.code(200);
	}

	return h
		.response({
			message: "Book has not been updated",
			status: "error",
		})
		.code(404);
};

const deleteBookHandler = (request, h) => {
	const { id } = request.params;

	const index = bookshelf.findIndex(book => book.id === id);

	if (index !== -1) {
		bookshelf.splice(index, 1);
		return h
			.response({
				message: "Book has been deleted",
				status: "success",
			})
			.code(200);
	}

	return h
		.response({
			message: "Book has not been deleted",
			status: "error",
		})
		.code(404);
};

module.exports = {
	mainPathHandler,
	createBookHandler,
	getBookHandler,
	detailBookHandler,
	editBookHandler,
	deleteBookHandler,
};
