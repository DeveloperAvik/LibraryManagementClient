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
        setErr(undefined);
        onSubmit({ quantity, dueDate });
    };

    return (
        <form
            onSubmit={submit}
            className="bg-white p-4 rounded shadow max-w-md space-y-3"
        >
            <div>
                <label className="block text-sm">Quantity</label>
                <input
                    type="number"
                    min={1}
                    max={maxQty}
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 1)
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                />
                <p className="text-sm text-gray-500">
                    Available copies: {maxQty}
                </p>
            </div>

            <div>
                <label className="block text-sm">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 w-full border rounded px-3 py-2"
                />
            </div>

            {err && <p className="text-red-600">{err}</p>}

            <div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 text-white rounded"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Borrow"}
                </button>
            </div>
        </form>
    );
}
