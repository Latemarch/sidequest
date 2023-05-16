import GridBox from '@/components/GridBox';
import UserCard from '@/components/user/UserCard';
import UserSideBar from '@/components/user/UserSideBar';
import { USERS } from '@/dummy/users';
import useUser from '@/hooks/react-query/useUser';
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
const User = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  // const {
  //   userQuery: { data: users },
  // } = useUser();
  return (
    <GridBox>
      <UserSideBar />
      <RightColumn>
        <p className="nanum-bold">Star | 가입일 | 활동</p>
        <CardWrapper>
          {USERS.filter((el) => el.MEMBER_ID < 30 && el.MEMBER_ID > 0).map(
            (user) => (
              <UserCard key={user.MEMBER_ID} user={user} />
            )
          )}
        </CardWrapper>
      </RightColumn>
    </GridBox>
  );
};

export default User;
