const APP_ROOT_PATH = process.cwd();

const BOOKS_FILE_PATH = 'public/books';

const REQUIRED_FIELDS = ['title', 'description', 'authors', 'favourite', 'fileCover', 'fileName'];

const ERROR_ROUTE = '/404';
const API_URL = '/api';
const USER_URL = '/user';
const BOOKS_URL = '/books';
const USER_API_URL = API_URL + USER_URL;
const BOOKS_API_URL = API_URL + BOOKS_URL;

const NO_BOOK_BY_ID = "Didn't find the book with such id!";
const NO_BOOK_ID = 'Show me some book ID, boy';

export {
  REQUIRED_FIELDS,
  USER_URL,
  BOOKS_URL,
  API_URL,
  USER_API_URL,
  BOOKS_API_URL,
  ERROR_ROUTE,
  NO_BOOK_BY_ID,
  NO_BOOK_ID,
  BOOKS_FILE_PATH,
  APP_ROOT_PATH,
};
