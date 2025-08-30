import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "../api";
import BookForm from "../components/BookForm";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, BookOpen } from "lucide-react";

export default function EditBook() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useGetBookQuery(id!);
    const [updateBook, { isLoading: saving }] = useUpdateBookMutation();

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
            </div>
        );

    if (isError)
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-red-600 text-lg font-medium">
                    {(error as any)?.data?.message || "⚠️ Failed to load book"}
                </p>
            </div>
        );

    const b = data?.data;
    if (!b)
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-gray-500">Book not found.</p>
            </div>
        );

    const onSubmit = async (values: any) => {
        try {
            await updateBook({ id: id!, data: values }).unwrap();
            navigate(`/books/${id}`);
        } catch (e) {
            console.error(e);
            alert((e as any)?.data?.message || "Failed to update");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl mx-auto"
            >
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 rounded-lg border border-gray-200 bg-white hover:border-indigo-300 hover:text-indigo-600 transition"
                    >
                        <ArrowLeft size={18} />
                        <span className="font-medium">Back</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-indigo-600" />
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                            Edit Book
                        </h1>
                    </div>
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
                >
                    <p className="text-gray-600 mb-6">
                        Update details for <span className="font-semibold">{b.title}</span>
                    </p>

                    <BookForm
                        defaultValues={b as any}
                        onSubmit={onSubmit}
                        submitLabel={
                            saving ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin h-5 w-5" /> Saving...
                                </span>
                            ) : (
                                "Save Changes"
                            )
                        }
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
