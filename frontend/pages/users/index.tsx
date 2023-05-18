import GridBox from '@/components/GridBox';
import UserCard from '@/components/user/UserCard';
import UserSideBar from '@/components/user/UserSideBar';
import useUser from '@/hooks/react-query/useUser';
import useApi from '@/hooks/useApi';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
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
  const [inputValue, setInputValue] = useState<string>('');
  const [users, setUsers] = useState<User[]>();
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);

  const {
    userQuery: { data: allUsers },
    searchUserByKeyword: { data: searchedUsers },
  } = useUser({ page, pageSize, keyword });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    if (inputValue.trim().length < 1) {
      setUsers(allUsers);
    } else {
      setKeyword(inputValue);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);
  useEffect(() => {
    setUsers(searchedUsers);
  }, [searchedUsers]);

  users && console.log(users);
  return (
    <GridBox>
      <UserSideBar />
      <RightColumn>
        <input
          onChange={handleChange}
          value={inputValue}
          placeholder="Search user..."
        />
        <button onClick={handleClick}>찾기</button>
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
