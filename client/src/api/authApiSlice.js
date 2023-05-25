import { apiSlice } from './apiSlice.js'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    identification: builder.query({
      query: () => '/identification',
      providesTags: ['auth']
    }),
    authentication: builder.mutation({
      query: authData => ({
        url: '/authentication',
        method: 'post',
        body: authData
      }),
      invalidatesTags: ['auth']
    }),
    signOut: builder.mutation({
      query: () => ({
        url: '/singout',
        method: 'post',
      }),
      invalidatesTags: ['auth']
    }),
  })
})

export const {
  useIdentificationQuery,
  useAuthenticationMutation,
  useSignOutMutation,
} = authApiSlice
