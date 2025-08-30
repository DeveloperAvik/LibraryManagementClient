import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery } from "@/features/books/api";
import { useBorrowBookMutation } from "@/features/borrows/api";
import toast from "react-hot-toast";

export default function BorrowBook() {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    if (!bookId) {
        toast.error("No book ID provided");
        navigate("/books");
        return null;
    }

    const { data, isLoading, isError } = useGetBookQuery(bookId);
    const bookData = data?.data; // actual book

    const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
    const [quantity, setQuantity] = useState(1);
    const [dueDate, setDueDate] = useState("");

    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    const maxDateString = maxDate.toISOString().split("T")[0];

    if (isLoading) return <p>Loading book...</p>;
    if (isError || !bookData) return <p>Book not found.</p>;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to borrow book");
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
                    <label>Quantity</label>
                    <input
                        type="number"
                        min={1}
                        max={Number(bookData.available) || 0}
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Math.min(Number(e.target.value), Number(bookData.available) || 0))
                        }
                    />
                </div>

                <div>
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        min={today}
                        max={maxDateString}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={isBorrowing || quantity < 1 || !dueDate}>
                    {isBorrowing ? "Borrowing..." : "Borrow Book"}
                </button>
            </form>
        </div>
    );
}
