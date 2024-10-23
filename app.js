const fs = require("fs/promises");

const { admins } = require("./users"); // any name
const getCurrentYear = require("./date").getCurrentYear();
const getCurrentMonth = require("./date").getCurrentMonth();
const books = require("./books");

const getFile = async () => {
  const result = await fs.readFile("./files/file.txt", "utf-8");
  console.log(result);
};

const addToFile = async () => {
  const result = await fs.appendFile("./files/file.txt", "\n New text added!");
  console.log(result);
};

const replaceText = async () => {
  const result = await fs.writeFile("./files/file.txt", "Content rewrited");
  console.log(result); // return undefined but rewrite file
};

const invokeAction = async ({ action, id, title, author }) => {
  switch (action) {
    case "list":
      const allBooks = await books.getAll();
      console.log(allBooks);
      break;
    case "getById":
      const book = await books.getById(id);
      console.log(book);
      break;
    case "addBook":
      const newBook = await books.addBook({ title, author });
      console.log(newBook);
      break;
    case "updateById":
      const updatedBook = await books.updateById(id, { title, author });
      console.log(updatedBook);
      break;
    case "deleteById":
      const deletedBook = await books.deleteById(id);
      console.log(deletedBook);
      break;
    default:
      console.log("Uknown action");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "getById", id: "3" });
// invokeAction({ action: "addBook", title: "1984", author: "J. Oruell" });
// invokeAction({
//   action: "updateById",
//   ID: "TfF8R3l1zK3xXjMTrxUxp",
//   title: "1987",
//   author: "J. Oruell",
// });
invokeAction({ action: "deleteById", id: "3" });
