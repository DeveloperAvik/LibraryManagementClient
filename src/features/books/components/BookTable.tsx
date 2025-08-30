import { Link, useNavigate } from "react-router-dom";
import type { Book } from "../types";
import { useDeleteBookMutation } from "../api";

export default function BookTable({ books }: { books: Book[] }) {
    const [deleteBook] = useDeleteBookMutation();
    const navigate = useNavigate();

    const onDelete = async (id: string) => {
        if (confirm("Delete this book?")) {
            await deleteBook(id);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b bg-gradient-to-r from-indigo-500 to-purple-600">
                <h2 className="text-lg font-semibold text-white">📚 Library Books</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Author</th>
                            <th className="px-6 py-3">Genre</th>
                            <th className="px-6 py-3">ISBN</th>
                            <th className="px-6 py-3">Copies</th>
                            <th className="px-6 py-3">Available</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {books.map((b) => (
                            <tr
                                key={b._id}
                                className="hover:bg-indigo-50 transition-colors duration-150"
                            >
                                <td className="px-6 py-3 font-medium text-indigo-700">
                                    <Link
                                        to={`/books/${b._id}`}
                                        className="hover:underline hover:text-indigo-900"
                                    >
                                        {b.title}
                                    </Link>
                                </td>
                                <td className="px-6 py-3">{b.author}</td>
                                <td className="px-6 py-3">{b.genre}</td>
                                <td className="px-6 py-3 font-mono text-gray-600">{b.isbn}</td>
                                <td className="px-6 py-3">{b.copies}</td>
                                <td className="px-6 py-3">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${b.available
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {b.available ? "Available" : "Not Available"}
                                    </span>
                                </td>
                                <td className="px-6 py-3 flex justify-center gap-2">
                                    <button
                                        onClick={() => navigate(`/edit-book/${b._id}`)}
                                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(b._id)}
                                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => navigate(`/borrow/${b._id}`)}
                                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                    >
                                        Borrow
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
