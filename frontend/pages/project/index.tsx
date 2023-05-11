import ProjectCarousel from '@/components/project/ProjectCarousel';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { api } from '@/util/api';
import { useRef, useEffect } from 'react';
import ProjectSkeleton from '@/components/skeleton/ProjectSkeleton';
import Link from 'next/link';
import { Project } from '@/types/project';
import ProjectCardbox from '@/components/project/ProjectCardbox';
import Message from '@/components/Message';

type PageProps = { data: Project[]; total: number };

const ProjectHome = () => {
  const router = useRouter();

  //데이터 fetch
  const page_limit = 4;
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery(
      'projects',
      ({ pageParam = 1 }) =>
        api(`${router.asPath}?size=${page_limit}&page=${pageParam}`).then(
          (res) => res.data
        ),
      {
        getNextPageParam: (lastPage: PageProps, allPages: PageProps[]) => {
          if (lastPage.data.length < page_limit) {
            return null;
          }
          return allPages.length + 1;
        },
      }
    );

  //무한 스크롤 effect
  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      target.current &&
      data?.pageParams &&
      data?.pageParams[data.pageParams.length - 1] === null
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target.current, data?.pageParams]);

  if (isLoading) return <Message>로딩중입니다.</Message>;
  if (error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  if (data)
    return (
      <Box>
        <div className="link-box">
          <Link href={`${router.asPath}/create`} className="main-btn">
            <span>프로젝트 작성</span>
          </Link>
        </div>
        <div className="special-box">
          <div>
            <div className="nanum-bold">신규 프로젝트</div>
            <div className="carousel-box">
              <ProjectCarousel
                projects={data.pages ? data.pages[0].data : []}
              />
            </div>
          </div>
          <div>
            <div className="nanum-bold">인기 프로젝트</div>
            <div className="carousel-box">
              <ProjectCarousel
                projects={data.pages ? data.pages[0].data : []}
              />
            </div>
          </div>
        </div>
        <ProjectCardbox
          title="전체 프로젝트"
          data={data.pages?.flatMap((page) => page.data)}
        >
          {isFetching && hasNextPage && <ProjectSkeleton />}
        </ProjectCardbox>
        <div ref={target} className="observer"></div>
        {!hasNextPage && (
          <div className="last-box nanum-bold blink">
            페이지가 존재하지 않습니다.
          </div>
        )}
      </Box>
    );
};

export default ProjectHome;

const Box = styled.div`
  padding: var(--padding-1);

  .link-box {
    display: flex;
    justify-content: end;
    margin-bottom: 24px;
    > a {
      width: auto;
    }
  }
  .special-box {
    width: 100%;
    grid-gap: 16px;
    display: flex;
    @media (max-width: 960px) {
      display: flex;
      flex-direction: column;
    }

    > div {
      border: 1px solid #dfdede;
      padding: var(--padding-1);
      width: 50%;
      margin-bottom: 56px;
      @media (max-width: 960px) {
        width: 100%;
        > div {
          margin-bottom: 12px;
        }
      }
    }

    .slick-slider {
      > button {
        display: none !important;
      }
    }
  }

  .common-box {
    .projects-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      margin-top: 24px;
      margin-bottom: 4px;
      gap: 16px;
      @media (max-width: 1300px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 960px) {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
    }
  }

  .observer {
    height: 5vh;
  }

  .last-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
`;
