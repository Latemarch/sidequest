import { userStatus } from '@/recoil/atom';
import { User } from '@prisma/client';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface IProps {
  id?: number | undefined;
  keyword?: string | undefined;
  page?: number;
  pageSize?: number;
}

export default function useUser({ id, keyword, page, pageSize }: IProps) {
  const setIsLoggedIn = useSetRecoilState(userStatus);
  const queryClient = useQueryClient();

  const userQuery = useQuery(['users'], () => getUsers(page, pageSize));

  const getUserStatus = useQuery(['loggedIn'], getStatus);
  const getMyInfo = useQuery(['users', 'me'], getMe);
  const setUserLogOut = useMutation(logOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(['loggedIn']);
      setIsLoggedIn(false);
    },
  });

  const getUserById = useQuery(['loggedIn', id], () => getUser(id));

  const searchUserByKeyword = useQuery(['users', keyword], () =>
    searchUser(keyword)
  );

  return {
    userQuery, //
    getUserById,
    getUserStatus,
    setUserLogOut,
    getMyInfo,
    searchUserByKeyword,
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

export const searchUser = async (keyword: string | undefined) => {
  // if (!name) throw new Error('ID is undefined');
  if (!keyword) return;
  const response = await axios.get(`/api/users/search`, {
    params: { keyword },
  });
  return response.data;
};
