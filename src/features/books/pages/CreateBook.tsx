import { useCreateBookMutation } from "../api";
import BookForm from "../components/BookForm";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function CreateBook() {
    const [createBook, { isLoading }] = useCreateBookMutation();
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        try {
            await createBook(values).unwrap();
            navigate("/books"); 
        } catch (e) {
            console.error("Error creating book:", e);
            alert((e as any)?.data?.message || "Failed to create book");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        Add a New Book
                    </h1>
                </div>

                {/* Card */}
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                    <p className="text-gray-600 mb-6">
                        Fill in the details below to add a new book to the library.
                    </p>

                    <BookForm
                        onSubmit={onSubmit}
                        submitLabel={isLoading ? "Saving..." : "Create Book"}
                    />
                </div>
            </div>
        </div>
    );
}
