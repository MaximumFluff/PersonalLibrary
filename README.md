**FreeCodeCamp**- Information Security and Quality Assurance
------

# Project Personal Library

1) ADD YOUR MongoDB connection string to .env without quotes as db
    `example: DB=mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib`
2) SET NODE_ENV to `test` without quotes
3) You need to create all routes within `routes/api.js`
4) You will add any security features to `server.js`
5) You will create all of the functional tests in `tests/2_functional-tests.js`

## User Stories
- Nothing from my website will be cached in my client as a security measure. [x]
- I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure. [x]
- I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id. [x]
- I can get /api/books to retrieve an array of all books containing title, _id, & comment_count. [x]
- I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present). [x]
- I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}. [x]
- I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful. [x]
- If I try to request a book that doesn't exist I will get a 'no book exists' message. [x]
- I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful. [x]
- All 6 functional tests required are complete and passing. []


