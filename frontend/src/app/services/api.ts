import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TApplication } from "../../types/application";
import { TUser } from "../../types/user";

export const api: any = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000" }),
    tagTypes: ["Application", "User"],
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
        // USERS ***********************************************************
        getUsers: builder.query<TUser[], null>({
            query: () => ({
                url: "users",
                method: "GET",
            }),
            providesTags: ["User"]
        }),
        getUser: builder.query<TUser, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET"
            }),
            providesTags: ["User"]
        }),
        createUser: builder.mutation<TUser, TUser>({
            query: (user) => ({
                url: "users",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        updateUser: builder.mutation<{ message: string }, TUser>({
            query: (user) => ({
                url: `users/${user.id}`,
                method: "PUT",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        deleteUser: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"]
        }),
    })
});

export const {
    useGetApplicationsQuery,
    useGetUserApplicationsQuery,
    useCreateApplicationMutation,
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = api