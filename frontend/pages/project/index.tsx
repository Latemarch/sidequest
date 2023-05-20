import ProjectCarousel from '@/components/project/ProjectCarousel';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { api } from '@/util/api';
import { useRef, useEffect, useState, useMemo } from 'react';
import ProjectSkeleton from '@/components/skeleton/ProjectSkeleton';
import Link from 'next/link';
import { Project } from '@/types/project';
import Message from '@/components/Message';
import { useForm } from 'react-hook-form';
import Btn from '@/components/button/Btn';
import { BsSearch } from 'react-icons/bs';
import { PROJECT_FILTER } from '@/constant/constant';
import ProjectCardBox from '@/components/card_box/ProjectCardBox';
import { Form } from '@/types/types';
import useProjectJH from '@/hooks/react-query/useProjectJH';

const ProjectHome = () => {
  const router = useRouter();
  const { register, watch } = useForm<Form>();
  const search = router.query.search;
  const [filter, setFilter] = useState('');
  const filterNames = useMemo(() => Object.keys(PROJECT_FILTER), []);
  const filterHandler = (name: string) => {
    setFilter(PROJECT_FILTER[name]);
  };

  const {
    projectQuery: { data },
  } = useProjectJH({});

  if (data)
    return (
      <Box>
        <div className="search-box">
          <form>
            <input {...register('search')} type="text" />
            <Btn>
              <BsSearch />
            </Btn>
          </form>
        </div>
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
        <ProjectCardBox
          title={search ? `${search}의 결과입니다.` : '전체 프로젝트'}
          data={data.pages?.flatMap((page) => page.data)}
          skeleton={isFetching && hasNextPage && <ProjectSkeleton />}
        >
          <div className="filter-box noto-regular-13">
            {filterNames.map((name) => (
              <div
                key={name}
                className={PROJECT_FILTER[name] === filter ? 'focus' : ''}
                onClick={() => filterHandler(name)}
              >
                {name}
              </div>
            ))}
          </div>
        </ProjectCardBox>
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

  .filter-box {
    display: flex;
    align-items: center;
    .focus {
      background-color: black;
      color: white;
    }
    > div {
      padding: 4px 8px;
      cursor: pointer;
    }
  }

  .search-box {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    gap: 16px;
    > form {
      display: flex;
      gap: 8px;
    }
  }

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
