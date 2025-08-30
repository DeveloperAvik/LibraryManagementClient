import React from 'react'
import { useGetBorrowSummaryQuery } from "@/features/borrows/api";

export default function BorrowSummary() {
    const { data, isLoading, isError, error } = useGetBorrowSummaryQuery()
    const items = data?.data || []

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p className="text-red-600">{(error as any)?.data?.message || 'Failed to load'}</p>

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Borrow Summary</h1>
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-left">ISBN</th>
                            <th className="px-4 py-3 text-left">Total Quantity Borrowed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((it, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="px-4 py-2">{it.book.title}</td>
                                <td className="px-4 py-2">{it.book.isbn}</td>
                                <td className="px-4 py-2">{it.totalQuantity}</td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr><td className="px-4 py-3" colSpan={3}>No borrowed books yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
