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

## How to Access the Swagger Documentation
To access the Swagger UI for this API, follow these steps:

1. Ensure the API is running locally or deployed on a server.
2. Visit the following URL to access the Swagger documentation:
    ```bash
        http://localhost:8080/api-docs

(Replace `localhost:5000` with your deployed server URL if it's hosted remotely.)

The Swagger UI will provide an interactive interface where you can test all available API endpoints, view their documentation, and try out requests with ease.

---

## API Endpoints

### Books CRUD Operations

| Method | Endpoint                  | Description                                      |
|--------|---------------------------|--------------------------------------------------|
| GET    | `/api/books`              | Fetch all books or favorite books based on user role |
| POST   | `/api/books`              | Add a new book to the collection                 |
| PUT    | `/api/books/:id`          | Update a book by ID                             |
| DELETE | `/api/books/:id`          | Delete a book by ID                             |
| GET    | `/api/books/recommendations` | Get a random book recommendation                |
| POST   | `/api/books/favorite/:id` | Mark a book as favorite by ID                    |

### Request Body for POST/PUT
```json
{
"title": "Book Title",
"author": "Author Name",
"isbn": "978-1234567890",
"publishedYear": 2023
}

