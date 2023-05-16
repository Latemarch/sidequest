import { getUserById } from '@/util/api/users';
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
  const getUser = (id: number) =>
    useQuery(['users', id], () => getUserById(id), {
      staleTime: 1000 * 60 * 5,
    });

  const getUserStatus = useQuery(['loggedIn'], () => fetchUser(), {
    staleTime: Infinity,
  });

  const setUserLogOut = useMutation(logOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(['loggedIn']);
    },
  });

  return {
    userQuery, //
    getUser,
    getUserStatus,
    setUserLogOut,
    getMyInfo,
  };
}

async function fetchUser() {
  const response = await axios.get('/api/users/status');
  return response.data.ok;
}
async function getUsers(page?: number, pageSize?: number) {
  const response = await axios.get('/api/users/all');
  console.log('getUsers', response);
  return response.data;
}
async function getMe() {
  const response = await axios.get('/api/users/me');
  return response.data;
}

const logOut = async () => {
  console.log('logout', 'start');
  const response = await fetch('/api/users/logout', {
    method: 'POST',
  });

  console.log('logout', response);
  if (!response.ok) {
    throw new Error('Logout failed');
  }
};
