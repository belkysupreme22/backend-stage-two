# Books Collection API

This is a RESTful API for managing a "Books Collection". The API supports CRUD operations on books and includes additional custom endpoints for book recommendations and favorites. It is built using Node.js, Express, and MongoDB, with deployment on Render.

---

## **Features**
- Fetch all books from the collection.
- Add new books with validation.
- Update book details by ID.
- Delete books by ID.
- Custom endpoints:
  - **Recommendations**: Get a random book recommendation.
  - **Favorites**: Mark a book as your favorite.

---

## **Technologies Used**
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Render (for deployment)

---

## **API Endpoints**

### **Books CRUD Operations**
| Method | Endpoint        | Description                              |
|--------|-----------------|------------------------------------------|
| GET    | `/api/books`    | Fetch all books                         |
| POST   | `/api/books`    | Add a new book                          |
| PUT    | `/api/books/:id`| Update a book by ID                     |
| DELETE | `/api/books/:id`| Delete a book by ID                     |
| GET    | `/api/books/recommendations`| get a book recommendation   |
| POST   | `/api/books/favorite/:id`| Mark a book as favorite by ID  |
#### **Request Body for POST/PUT**
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "isbn": "978-1234567890",
  "publishedYear": 2023
}
