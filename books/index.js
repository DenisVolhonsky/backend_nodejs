const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const booksPath = path.join(__dirname, "books.json");

const updateBooks = async (books) =>
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

const getAll = async () => {
  const data = await fs.readFile(booksPath, "utf-8");
  return JSON.parse(data);
};

const getById = async (id) => {
  const books = await getAll();
  const result = books.find((item) => item.ID === id);
  return result || null;
};

const addBook = async ({ title, author }) => {
  const newBook = {
    id: nanoid(),
    title,
    author,
  };
  const books = await getAll();
  books.push(newBook);
  await updateBooks(books);
  return newBook;
};

const updateById = async (id, data) => {
  const books = await getAll();
  const index = books.findIndex((item) => item.ID === id);
  if (index === -1) {
    return null;
  }
  books[index] = { id, ...data };
  await updateBooks(books);
  return books[index];
};

const deleteById = async (id) => {
  const books = await getAll();
  const index = books.findIndex((item) => item.ID === id);
  if (index === -1) {
    return null;
  }
  const [result] = books.splice(index, 1);
  await updateBooks(books);
  return result;
};

module.exports = {
  getAll,
  getById,
  addBook,
  updateById,
  deleteById,
};
