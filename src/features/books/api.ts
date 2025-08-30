import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, Book, BookCreate, BookUpdate, Genre } from './types'

const baseUrl = import.meta.env.VITE_API_BASE_URL || ''

interface GetBooksParams {
    filter?: Genre
    sortBy?: string
    sort?: 'asc' | 'desc'
    limit?: number
    page?: number
}

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Books', 'Book'],
    endpoints: (build) => ({
        getBooks: build.query<ApiResponse<Book[]>, GetBooksParams | void>({
            query: (args) => {
                const p = new URLSearchParams()
                if (args?.filter) p.set('filter', args.filter)
                p.set('sortBy', args?.sortBy ?? 'createdAt')
                p.set('sort', args?.sort ?? 'desc')
                p.set('limit', String(args?.limit ?? 10))
                if (args?.page) p.set('page', String(args.page))
                const qs = p.toString()
                return { url: `/api/books${qs ? `?${qs}` : ''}` }
            },
            providesTags: (res) =>
                res?.data
                    ? [...res.data.map((b) => ({ type: 'Book' as const, id: b._id })), { type: 'Books' as const, id: 'LIST' }]
                    : [{ type: 'Books' as const, id: 'LIST' }],
        }),
        getBook: build.query<ApiResponse<Book>, string>({
            query: (id) => ({ url: `/api/books/${id}` }),
            providesTags: (_r, _e, id) => [{ type: 'Book', id }],
        }),
        createBook: build.mutation<ApiResponse<Book>, BookCreate>({
            query: (body) => ({ url: '/api/books', method: 'POST', body }),
            invalidatesTags: [{ type: 'Books', id: 'LIST' }],
        }),
        updateBook: build.mutation<ApiResponse<Book>, { id: string; data: BookUpdate }>({
            query: ({ id, data }) => ({ url: `/api/books/${id}`, method: 'PUT', body: data }),
            invalidatesTags: (_r, _e, { id }) => [{ type: 'Book', id }, { type: 'Books', id: 'LIST' }],
        }),
        deleteBook: build.mutation<ApiResponse<null>, string>({
            query: (id) => ({ url: `/api/books/${id}`, method: 'DELETE' }),
            invalidatesTags: [{ type: 'Books', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetBooksQuery,
    useGetBookQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = booksApi
