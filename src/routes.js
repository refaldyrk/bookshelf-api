/**
 * Routing For APIs Bookshelf
 */

const {
	mainPathHandler,
	createBookHandler,
	getBookHandler,
	detailBookHandler,
	editBookHandler,
	deleteBookHandler,
} = require("./handler");

const routes = [
	{
		method: "GET",
		path: "/",
		handler: mainPathHandler,
	},
	{
		method: "POST",
		path: "/books",
		handler: createBookHandler,
	},
	{
		method: "GET",
		path: "/books",
		handler: getBookHandler,
	},
	{
		method: "GET",
		path: "/books/{id}",
		handler: detailBookHandler,
	},
	{
		method: "PUT",
		path: "/books/{id}",
		handler: editBookHandler,
	},
	{
		method: "DELETE",
		path: "/books/{id}",
		handler: deleteBookHandler,
	},
];

module.exports = routes;
