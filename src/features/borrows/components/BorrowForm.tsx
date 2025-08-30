import React, { useState } from "react";

export default function BorrowForm({
    maxQty,
    onSubmit,
    saving,
}: {
    maxQty: number;
    onSubmit: (values: { quantity: number; dueDate: string }) => void;
    saving?: boolean;
}) {
    const [quantity, setQuantity] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [err, setErr] = useState<string>();

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (quantity < 1 || quantity > maxQty) {
            setErr(`Quantity must be between 1 and ${maxQty}`);
            return;
        }
        if (!dueDate) {
            setErr("Please select a due date");
            return;
        }
        if (dueDate < today) {
            setErr("Due date cannot be in the past");
            return;
        }
        setErr(undefined);
        onSubmit({ quantity, dueDate });
    };

    return (
        <form
            onSubmit={submit}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg max-w-md space-y-5 border border-gray-200"
        >
            {/* Quantity */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Quantity
                </label>
                <input
                    type="number"
                    min={1}
                    max={maxQty}
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 1)
                    }
                    className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Available copies: {maxQty}
                </p>
            </div>

            {/* Due Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Due Date
                </label>
                <input
                    type="date"
                    min={today}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
            </div>

            {/* Error Message */}
            {err && (
                <p className="text-red-600 text-sm font-medium bg-red-50 px-3 py-2 rounded-lg">
                    ⚠️ {err}
                </p>
            )}

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition disabled:opacity-60"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Borrow Now 📚"}
                </button>
            </div>
        </form>
    );
}
