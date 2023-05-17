import { userStatus } from '@/recoil/atom';
import { User } from '@prisma/client';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface IProps {
  id?: number | undefined;
  name?: string | undefined;
}

export default function useUser({ id, name }: IProps) {
  const setIsLoggedIn = useSetRecoilState(userStatus);
  const queryClient = useQueryClient();
  const userQuery = useQuery(['users'], () => getUsers());
  const getMyInfo = useQuery(['users', 'me'], () => getMe());

  const getUserById = useQuery(['loggedIn', id], () => getUser(id), {
    staleTime: Infinity,
  });

  const searchUserByName = useQuery(['users', name], () => searchUser(name), {
    staleTime: Infinity,
  });

  const getUserStatus = useQuery(['loggedIn'], () => getStatus(), {
    staleTime: Infinity,
  });

  const setUserLogOut = useMutation(logOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(['loggedIn']);
      setIsLoggedIn(false);
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
  console.log('getUsers');
  const response = await axios.post('/api/users/all', {
    page,
    pageSize,
  });

  console.log('getUsers', response);
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
const getUser = async (id: number | undefined) => {
  if (!id) return;
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

const searchUser = async (name: string | undefined) => {
  // if (!name) throw new Error('ID is undefined');
  if (!name) return;
  const response = await axios.post(`/api/users/find`, {
    params: {
      name,
    },
  });
  return response.data;
};
