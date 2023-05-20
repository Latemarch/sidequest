import { Project } from '@prisma/client';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

interface IProps {
  id?: number | undefined;
  keyword?: string | undefined;
  page?: number;
  pageSize?: number;
}
export default function useProjectJH({ id, keyword, page, pageSize }: IProps) {
  const queryClient = useQueryClient();

  const projectQuery = useQuery(['projects'], () =>
    getProjects(page, pageSize)
  );

  // const getUserStatus = useQuery(['loggedIn'], getStatus);
  // const getMyInfo = useQuery(['users', 'me'], getMe);
  // const setUserLogOut = useMutation(logOut, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['loggedIn']);
  //   },
  // });

  // const getUserById = useQuery(['loggedIn', id], () => getUser(id));

  // const searchUserByKeyword = useQuery(['users', keyword], () =>
  //   searchUser(keyword)
  // );

  return {
    projectQuery,
  };
}
async function getProjects(
  page?: number,
  pageSize?: number
): Promise<Project[]> {
  const response = await axios.get('/api/projects/', {
    params: {
      page,
      pageSize,
      // ...(page ? { page } : {}),
      // ...(pageSize ? { pageSize } : {}),
    },
  });
  return response.data;
}
