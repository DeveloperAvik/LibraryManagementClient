# Library Borrowing System

A React + Redux Toolkit Query (RTK Query) frontend for managing a library's book borrowing system, integrated with a RESTful backend API. Users can view books, borrow them, and see a summary of borrowed books.

---

## Features

- Browse available books with details (title, ISBN, available copies)
- Borrow books by specifying quantity and due date
- Prevent borrowing more copies than available
- Display borrowed books summary with total quantity per book
- Responsive and modern UI using Tailwind CSS
- Real-time feedback with toast notifications for successful or failed borrow operations

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion
- **State Management:** Redux Toolkit + RTK Query
- **Backend:** RESTful API (MongoDB aggregation for borrow summary)
- **Notifications:** Browser alert or toast messages
- **Routing:** React Router

---

## API Endpoints

### Borrow a Book

**Request Body:**

```json
{
  "bookId": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```