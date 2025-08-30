import React from "react";
import { useGetBorrowSummaryQuery } from "../api";
import toast from "react-hot-toast";

interface BorrowSummaryItem {
    book: {
        title: string;
        isbn: string;
    };
    totalQuantity: number;
}

interface BorrowSummaryResponse {
    success: boolean;
    message: string;
    data: BorrowSummaryItem[];
}

export default function BorrowSummary() {
    const { data, isLoading, isError, error } = useGetBorrowSummaryQuery();

    if (isLoading) {
        return (
            <p className="text-center text-gray-500 mt-8">Loading borrowed books...</p>
        );
    }

    if (isError) {
        const errorMessage = (error as any)?.data?.message || "Failed to load borrowed books summary";
        toast.error(errorMessage);
        return (
            <p className="text-center text-red-500 mt-8">{errorMessage}</p>
        );
    }

    const borrowData = data as BorrowSummaryResponse;

    if (!borrowData?.success) {
        return (
            <p className="text-center text-red-500 mt-8">{borrowData?.message || "Failed to load summary"}</p>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Borrowed Books Summary
            </h2>
            <div className="space-y-4">
                {borrowData.data.length === 0 && (
                    <p className="text-gray-500">No books have been borrowed yet.</p>
                )}
                {borrowData.data.map((item, index) => (
                    <div
                        key={`borrow-${index}`}
                        className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50"
                    >
                        <div>
                            <p className="font-medium text-gray-700">{item.book.title}</p>
                            <p className="text-sm text-gray-500">ISBN: {item.book.isbn}</p>
                        </div>
                        <div className="font-semibold text-indigo-600">
                            Total Borrowed: {item.totalQuantity}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}