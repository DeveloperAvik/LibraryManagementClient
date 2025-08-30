import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Borrow } from "./types";

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

interface BorrowResponse {
    success: boolean;
    message: string;
    data: Borrow;
}

export const borrowsApi = createApi({
    reducerPath: "borrowsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://library-api-virid-delta.vercel.app/api",
    }),
    tagTypes: ["Borrows"],
    endpoints: (builder) => ({
        getBorrowSummary: builder.query<BorrowSummaryResponse, void>({
            query: () => "/borrow",
            providesTags: ["Borrows"],
        }),

        borrowBook: builder.mutation<BorrowResponse, {
            book: string;
            quantity: number;
            dueDate: string;
        }>({
            query: (body) => ({
                url: "/borrow",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Borrows"],
        }),

        getBorrows: builder.query<Borrow[], void>({
            query: () => "/borrow",
            providesTags: ["Borrows"],
        }),

        getBorrowById: builder.query<Borrow, string>({
            query: (id) => `/borrow/${id}`,
            providesTags: ["Borrows"],
        }),
    }),
});

export const {
    useGetBorrowSummaryQuery,
    useBorrowBookMutation,
    useGetBorrowsQuery,
    useGetBorrowByIdQuery,
} = borrowsApi;