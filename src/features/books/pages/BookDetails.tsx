import { useParams, useNavigate } from 'react-router-dom'
import { useGetBookQuery, useDeleteBookMutation } from '../api'

export default function BookDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { data, isLoading, isError, error } = useGetBookQuery(id!)
    const [deleteBook] = useDeleteBookMutation()

    const b = data?.data

    const onDelete = async () => {
        if (!id) return
        if (confirm('Delete this book?')) {
            await deleteBook(id)
            navigate('/books')
        }
    }

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p className="text-red-600">{(error as any)?.data?.message || 'Failed to load'}</p>
    if (!b) return <p>Not found</p>

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{b.title}</h1>
                <div className="flex gap-2">
                    <button onClick={() => navigate(`/edit-book/${b._id}`)} className="px-3 py-1 border rounded">Edit</button>
                    <button onClick={() => navigate(`/borrow/${b._id}`)} className="px-3 py-1 border rounded bg-gray-800 text-white">Borrow</button>
                    <button onClick={onDelete} className="px-3 py-1 border rounded text-red-600">Delete</button>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow grid gap-2">
                <div><span className="font-medium">Author:</span> {b.author}</div>
                <div><span className="font-medium">Genre:</span> {b.genre}</div>
                <div><span className="font-medium">ISBN:</span> {b.isbn}</div>
                <div><span className="font-medium">Copies:</span> {b.copies}</div>
                <div><span className="font-medium">Available:</span> {b.available ? 'Yes' : 'No'}</div>
                {b.description && <div><span className="font-medium">Description:</span> {b.description}</div>}
                <div className="text-sm text-gray-500">Created: {new Date(b.createdAt).toLocaleString()}</div>
                <div className="text-sm text-gray-500">Updated: {new Date(b.updatedAt).toLocaleString()}</div>
            </div>
        </div>
    )
}
