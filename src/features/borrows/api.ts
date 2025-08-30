import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BorrowSummary {
    book: {
        title: string;
        isbn: string;
    };
    totalQuantity: number;
}

export const borrowsApi = createApi({
    reducerPath: "borrowsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://library-api-virid-delta.vercel.app/api" }),
    tagTypes: ["Borrows"],
    endpoints: (builder) => ({

        borrowBook: builder.mutation<any, { book: string; quantity: number; dueDate: string }>({
            query: (body) => ({
                url: "/borrow",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Borrows"],
        }),

        getBorrowSummary: builder.query<{ success: boolean; message: string; data: BorrowSummary[] }, void>({
            query: () => "/borrow/summary",
            providesTags: ["Borrows"],
        }),
    }),
});

export const {
    useBorrowBookMutation,
    useGetBorrowSummaryQuery,
} = borrowsApi;
