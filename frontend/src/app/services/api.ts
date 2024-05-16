import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TApplication } from "../../types/application";

export const api: any = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000" }),
    tagTypes: ["Application"],
    endpoints: (builder) => ({
        getApplications: builder.query<TApplication[], null>({
            query: () => ({
                url: "applications",
                method: "GET",
            }),
            providesTags: ["Application"]
        }),
        getUserApplications: builder.query<TApplication[], string>({
            query: (id) => ({
                url: `applications/user/${id}`,
                method: "GET"
            }),
            providesTags: ["Application"]
        }),
        createApplication: builder.mutation<TApplication, TApplication>({
            query: (application) => ({
                url: "applications",
                method: "POST",
                body: application
            }),
            invalidatesTags: ["Application"]
        }),
        updateApplication: builder.mutation<{ message: string }, TApplication>({
            query: (application) => ({
                url: `applications/${application.id}`,
                method: "PUT",
                body: application
            }),
            invalidatesTags: ["Application"]
        }),
        deleteApplication: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `applications/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Application"]
        }),
    })
});

export const {
    useGetApplicationsQuery,
    useGetUserApplicationsQuery,
    useCreateApplicationMutation,
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
} = api