import { userStatus } from '@/recoil/atom';
import { User } from '@prisma/client';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface IProps {
  id?: number | undefined;
  name?: string | undefined;
  page?: number;
  pageSize?: number;
}

export default function useUser({ id, name, page, pageSize }: IProps) {
  const setIsLoggedIn = useSetRecoilState(userStatus);
  const queryClient = useQueryClient();

  const userQuery = useQuery(['users'], () => getUsers(page, pageSize));

  const getMyInfo = useQuery(['users', 'me'], getMe);

  const getUserById = useQuery(['loggedIn', id], () => getUser(id));

  const searchUserByName = useQuery(['users', name], () => searchUser(name));

  const getUserStatus = useQuery(['loggedIn'], getStatus);

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
  const response = await axios.get('/api/users/all', {
    params: {
      page,
      pageSize,
      // ...(page ? { page } : {}),
      // ...(pageSize ? { pageSize } : {}),
    },
  });
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

export const searchUser = async (name: string | undefined) => {
  // if (!name) throw new Error('ID is undefined');
  if (!name) return;
  const response = await axios.post(`/api/users/find`, {
    name,
  });
  return response.data;
};
