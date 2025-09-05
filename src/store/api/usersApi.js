import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Get all users (for client-side filtering and pagination)
    getAllUsers: builder.query({
      query: () => 'users',
      transformResponse: (response) => {
        const users = Array.isArray(response) ? response : [];
        return users;
      },
      providesTags: (result) => {
        const users = result || [];
        return [
          ...users.map(({ id }) => ({ type: 'User', id })),
          { type: 'User', id: 'LIST' },
        ];
      },
    }),
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, search = '', role = '', isActive = '' } = {}) => {
        // For simplicity, we'll fetch all users and do client-side pagination
        return 'users';
      },
      transformResponse: (response, meta, arg) => {
        console.log('API Response:', { response, arg });
        
        let allUsers = Array.isArray(response) ? response : [];
        const { page = 1, limit = 10, search = '', role = '', isActive = '' } = arg;
        
        // Apply filters
        let filteredUsers = allUsers;
        
        if (search) {
          const searchLower = search.toLowerCase();
          filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
          );
        }
        
        if (role) {
          filteredUsers = filteredUsers.filter(user => user.role === role);
        }
        
        if (isActive !== '') {
          const activeFilter = isActive === 'true';
          filteredUsers = filteredUsers.filter(user => user.isActive === activeFilter);
        }
        
        const totalCount = filteredUsers.length;
        
        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        
        console.log('Pagination Logic:', {
          page,
          limit,
          totalCount,
          startIndex,
          endIndex,
          paginatedCount: paginatedUsers.length,
          totalPages: Math.ceil(totalCount / limit)
        });
        
        return {
          users: paginatedUsers,
          totalCount: totalCount,
        };
      },
      providesTags: (result) => {
        const users = result?.users || [];
        return [
          ...users.map(({ id }) => ({ type: 'User', id })),
          { type: 'User', id: 'LIST' },
        ];
      },
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
