import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery } from "@/features/books/api";
import { useBorrowBookMutation } from "@/features/borrows/api";
import toast from "react-hot-toast";

interface Book {
    _id: string;
    title: string;
    isbn: string;
    available: number;
}

export default function BorrowBook() {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    // Add validation for bookId
    useEffect(() => {
        if (!bookId) {
            toast.error("No book ID provided");
            navigate("/books");
        }
    }, [bookId, navigate]);

    const { data: book, isLoading, isError } = useGetBookQuery(bookId, {
        skip: !bookId
    });

    const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
    const [quantity, setQuantity] = useState(1);
    const [dueDate, setDueDate] = useState("");

    // Set minimum date to today and maximum date to 30 days from now
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    const maxDateString = maxDate.toISOString().split('T')[0];

    if (isLoading) return <p className="text-center text-gray-500">Loading book...</p>;

    if (isError || !book?.data) {
        return <p className="text-center text-red-500">Book not found or failed to load.</p>;
    }

    const bookData = book.data;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!dueDate) {
            toast.error("Please select a due date");
            return;
        }

        try {
            const result = await borrowBook({
                book: bookId,
                quantity,
                dueDate: new Date(dueDate).toISOString(),
            }).unwrap();

            if (result.success) {
                toast.success("Book borrowed successfully!");
                navigate("/borrow-summary");
            } else {
                toast.error(result.message || "Failed to borrow book");
            }
        } catch (error: any) {
            console.error("Error borrowing:", error);
            toast.error(error?.data?.message || "Failed to borrow book");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Borrow: <span className="text-indigo-600">{bookData.title}</span>
            </h2>
            <p className="text-gray-600 mb-6">ISBN: {bookData.isbn}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        min={1}
                        max={bookData.available}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(Number(e.target.value), bookData.available))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Available: {bookData.available}</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        min={today}
                        max={maxDateString}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isBorrowing || quantity < 1 || !dueDate}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    {isBorrowing ? "Borrowing..." : "Borrow Book"}
                </button>
            </form>
        </div>
    );
}