import { useParams } from "react-router-dom";
import { useGetBookQuery } from "@/features/books/api";
import { useBorrowBookMutation } from "@/features/borrows/api";
import BorrowForm from "../components/BorrowForm";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

export default function BorrowBook() {
    const { bookId } = useParams();
    const { data: book, isLoading } = useGetBookQuery(bookId!);
    const [borrowBook] = useBorrowBookMutation();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh] text-lg text-gray-500 animate-pulse">
                Loading book details...
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex justify-center items-center h-[70vh] text-red-500 font-semibold">
                ❌ Book not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8"
            >
                {/* Book Details */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Book Cover */}
                    {book.coverImage ? (
                        <motion.img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full md:w-1/3 h-72 object-cover rounded-xl shadow-md"
                            whileHover={{ scale: 1.05 }}
                        />
                    ) : (
                        <div className="w-full md:w-1/3 h-72 flex items-center justify-center rounded-xl shadow-md bg-gradient-to-br from-indigo-200 to-indigo-400 text-white text-6xl">
                            📖
                        </div>
                    )}

                    {/* Book Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                        <p className="text-gray-600 text-sm mt-1 italic">by {book.author}</p>
                        <p className="mt-4 text-gray-700 leading-relaxed">{book.description || "No description available."}</p>
                        <p className="mt-2 text-sm text-gray-500">ISBN: {book.isbn}</p>
                    </div>
                </div>

                {/* Borrow Form */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                        <CalendarDays className="w-6 h-6 text-indigo-600" />
                        Borrow this Book
                    </h2>
                    <BorrowForm
                        onSubmit={(values) => borrowBook(values)}
                        minDate={new Date().toISOString().split("T")[0]} // 🔥 prevent past dates
                    />
                </div>
            </motion.div>
        </div>
    );
}
