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

//Solve
const createBookHandler = (request, h) => {
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
	const id = nanoid(7);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	//Condition For Inserting Data
	if (!name) {
		return h
			.response({
				status: "fail",
				message: "Gagal menambahkan buku. Mohon isi nama buku",
			})
			.code(400);
	}

	if (readPage > pageCount) {
		return h
			.response({
				status: "fail",
				message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
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
				status: "success",
				message: "Buku berhasil ditambahkan",
				data: {
					bookId: id,
				},
			})
			.code(201);
	}

	return h
		.response({
			status: "error",
			message: "Buku gagal ditambahkan",
		})
		.code(500);
};

//Solve
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

	return h
		.response({
			status: "success",
			data: {
				books: arrayOfBook,
			},
		})
		.code(200);
};

//Solve
const detailBookHandler = (request, h) => {
	const { id } = request.params;

	const bookDetail = bookshelf.filter(book => book.id === id)[0];

	if (bookDetail !== undefined) {
		return h
			.response({
				status: "success",
				data: {
					book: bookDetail,
				},
			})
			.code(200);
	}

	return h
		.response({
			status: "error",
			message: "Buku tidak ditemukan",
		})
		.code(404);
};

//Solve
const editBookHandler = (request, h) => {
	const { id } = request.params;
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
	const updatedAt = new Date().toISOString();

	//Condition For Inserting Data
	if (!name) {
		return h
			.response({
				status: "fail",
				message: "Gagal memperbarui buku. Mohon isi nama buku",
			})
			.code(400);
	}

	if (readPage > pageCount) {
		return h
			.response({
				status: "fail",
				message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
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
				status: "success",
				message: "Buku berhasil diperbarui",
			})
			.code(200);
	}

	return h
		.response({
			status: "fail",
			message: "Gagal memperbarui buku. Id tidak ditemukan",
		})
		.code(404);
};

//Solve
const deleteBookHandler = (request, h) => {
	const { id } = request.params;

	const index = bookshelf.findIndex(book => book.id === id);

	if (index !== -1) {
		bookshelf.splice(index, 1);
		return h
			.response({
				message: "Buku berhasil dihapus",
				status: "success",
			})
			.code(200);
	}

	return h
		.response({
			status: "fail",
			message: "Buku gagal dihapus, id tidak ditemukan",
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
