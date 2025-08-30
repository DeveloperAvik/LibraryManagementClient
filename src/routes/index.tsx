import { Routes, Route, Navigate } from 'react-router-dom'
import BookList from '../features/books/pages/BookList'
import CreateBook from '../features/books/pages/CreateBook'
import BookDetails from '../features/books/pages/BookDetails'
import EditBook from '../features/books/pages/EditBook'
import BorrowBook from '../features/borrows/pages/BorrowBook'
import BorrowSummary from '../features/borrows/pages/BorrowSummary'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/books" replace />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/borrow/:bookId" element={<BorrowBook />} />
            <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
    )
}
