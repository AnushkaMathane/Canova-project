import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formAPI = createApi({
  reducerPath: "formAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/forms`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Forms"],
  endpoints: (build) => ({
    // create / update form
    updateForm: build.mutation({
      query: ({ action, ...data }) => ({
        url: action,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Forms"],
    }),

    // get pages (flow chart ke liye)
    getPages: build.query({
      query: (formId) => `/${formId}/pages`,
      providesTags: ["Forms"],
    }),

    // verify / publish form (THIS IS KEY 🔥)
    verifyForm: build.mutation({
      query: (formId) => ({
        url: `/${formId}/verify`,
        method: "POST",
      }),
    }),

    deleteForm: build.mutation({
      query: (id) => ({
        url: `/form/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Forms"],
    }),

    renameForm: build.mutation({
      query: ({ id, name }) => ({
        url: `/form/${id}/rename`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Forms"],
    }),
  }),
});

export const {
  useUpdateFormMutation,
  useGetPagesQuery,
  useVerifyFormMutation,
  useDeleteFormMutation,
  useRenameFormMutation,
} = formAPI;
