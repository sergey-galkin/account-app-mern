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
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'post',
      }),
      invalidatesTags: ['auth']
    }),
  })
})

export const {
  useIdentificationQuery,
  useAuthenticationMutation,
  useLogoutMutation,
} = authApiSlice
