import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { PostState, Project } from '@/types/project';

type ProjectData = {
  post_data: Project;
  post_state: PostState;
};

export const useProject = () => {
  const router = useRouter();

  const { isLoading, error, data, refetch } = useQuery<ProjectData, Error>(
    ['project', router.query.id],
    async () => {
      if (!router.route.includes('create')) {
        return await api(`/project/${router.query.id}`).then((res) => res.data);
      }
    }
  );

  //직군 업데이트
  const updateJob = useMutation(
    ({ job, update }: { job: string; update: string }) =>
      api.post(`${router.asPath}/job`, { job, update }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  //하트관련
  const updateHeart = useMutation(() => api.post(`${router.asPath}/heart`), {
    onSuccess: () => {
      refetch();
    },
  });

  //모집 상태
  const updateState = useMutation(
    (state: number) => api.post(`${router.asPath}/state`, { data: state }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return {
    projectQuery: { isLoading, error, data },
    updateJob,
    updateHeart,
    updateState,
  };
};
