import React, { useState } from "react";
import { motion } from "framer-motion";

interface BookFormProps {
    onSubmit: (values: any) => void;
    submitLabel: React.ReactNode;
    defaultValues?: any;
}

export default function BookForm({ onSubmit, submitLabel }: BookFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "SCIENCE",
        isbn: "",
        description: "",
        copies: 1,
        available: true,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        const { name, value, type } = target;

        const checked = (target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
        >
            <div>
                <label className="block font-medium">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block font-medium">Author</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block font-medium">Genre</label>
                <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="SCIENCE">Science</option>
                    <option value="FICTION">Fiction</option>
                    <option value="HISTORY">History</option>
                    <option value="PHILOSOPHY">Philosophy</option>
                </select>
            </div>

            <div>
                <label className="block font-medium">ISBN</label>
                <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block font-medium">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium">Copies</label>
                    <input
                        type="number"
                        name="copies"
                        value={formData.copies}
                        onChange={handleChange}
                        min="1"
                        className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex items-center mt-6">
                    <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label>Available</label>
                </div>
            </div>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white w-full py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
            >
                {submitLabel}
            </motion.button>
        </motion.form>
    );
}
