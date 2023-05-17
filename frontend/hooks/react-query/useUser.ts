import { User } from '@prisma/client';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function useUser() {
  const queryClient = useQueryClient();
  const userQuery = useQuery(['users'], () => getUsers(), {
    staleTime: 1000 * 60 * 5,
  });
  const getMyInfo = useQuery(['users', 'me'], () => getMe(), {
    staleTime: 1000 * 60 * 5,
  });
  const getUserById = (id: number) =>
    useQuery(['users', id], () => getUser(id), {
      staleTime: 1000 * 60 * 5,
    });
  const searchUserByName = (name: string) =>
    useQuery(['users', name], () => searchUser(name), {
      staleTime: 1000 * 60 * 5,
    });

  const getUserStatus = useQuery(['loggedIn'], () => getStatus(), {
    staleTime: Infinity,
  });

  const setUserLogOut = useMutation(logOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(['loggedIn']);
    },
  });

  return {
    userQuery, //
    getUserById,
    getUserStatus,
    setUserLogOut,
    getMyInfo,
    searchUserByName,
  };
}

async function getStatus(): Promise<boolean> {
  const response = await axios.get('/api/users/status');
  return response.data.ok;
}
async function getUsers(page?: number, pageSize?: number): Promise<User[]> {
  const response = await axios.get('/api/users/all');

  console.log('users', response);
  return response.data;
}
async function getMe(): Promise<User> {
  const response = await axios.get('/api/users/me');
  return response.data;
}

const logOut = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};
const getUser = async (id: number) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

const searchUser = async (name: string) => {
  const response = await axios.post(`/api/users/find`, {
    params: {
      name,
    },
  });
  return response.data;
};
