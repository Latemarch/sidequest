import GridBox from '@/components/GridBox';
import UserCard from '@/components/user/UserCard';
import UserSideBar from '@/components/user/UserSideBar';
import useUser from '@/hooks/react-query/useUser';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
//유저 페이지 입니다. 경로 '/user/'

const RightColumn = styled.div`
  padding: 20px;
`;
const CardWrapper = styled.div`
  padding-top: 20px;
  display: grid;
  width: 100%;
  gap: 10px;
  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
  /* @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  } */
`;
const Users = () => {
  const router = useRouter();
  const {
    userQuery: { data: users },
  } = useUser();
  users && console.log(users);

  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);

  return (
    <GridBox>
      <UserSideBar />
      <RightColumn>
        <p className="nanum-bold">Star | 가입일 | 활동</p>
        <CardWrapper>
          {users &&
            users.map((user: User) => <UserCard key={user.id} user={user} />)}
        </CardWrapper>
      </RightColumn>
    </GridBox>
  );
};

export default Users;
