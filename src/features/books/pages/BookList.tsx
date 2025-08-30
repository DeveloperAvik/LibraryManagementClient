import  { useState } from "react";
import { useGetBooksQuery } from "../api";
import BookTable from "../components/BookTable";
import type { Genre } from "../types";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";

export default function BookList() {
    const [filter, setFilter] = useState<Genre | "">("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sort, setSort] = useState<"asc" | "desc">("desc");
    const [limit, setLimit] = useState(10);

    const { data, isLoading, isError, error } = useGetBooksQuery({
        filter: filter || undefined,
        sortBy,
        sort,
        limit,
    });

    const books = data?.data || [];

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 pb-4 border-b shadow-sm">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    📚 All Books
                </h1>
                <p className="text-gray-500 text-sm">
                    Browse and manage the entire collection
                </p>
            </div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-2xl shadow"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Genre
                    </label>
                    <select
                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as Genre | "")}
                    >
                        <option value="">All</option>
                        {[
                            "FICTION",
                            "NON_FICTION",
                            "SCIENCE",
                            "HISTORY",
                            "BIOGRAPHY",
                            "FANTASY",
                        ].map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Sort By
                    </label>
                    <select
                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="createdAt">Created</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Order
                    </label>
                    <select
                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                        value={sort}
                        onChange={(e) => setSort(e.target.value as "asc" | "desc")}
                    >
                        <option value="desc">Desc</option>
                        <option value="asc">Asc</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Show per page
                    </label>
                    <input
                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                        type="number"
                        min={1}
                        max={50}
                        value={limit}
                        onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
                    />
                </div>
            </motion.div>

            {/* Data States */}
            {isLoading && (
                <div className="flex items-center justify-center h-40 text-gray-500">
                    <Loader2 className="animate-spin h-6 w-6 mr-2" />
                    Loading books...
                </div>
            )}

            {isError && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <p>{(error as any)?.data?.message || "Failed to load books"}</p>
                </div>
            )}

            {!isLoading && !isError && books.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow p-4"
                >
                    <BookTable books={books} />
                </motion.div>
            )}

            {!isLoading && !isError && books.length === 0 && (
                <p className="text-center text-gray-500 italic">
                    No books found. Try changing filters.
                </p>
            )}
        </div>
    );
}
