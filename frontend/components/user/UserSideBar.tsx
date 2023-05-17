import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  /* @media screen and (max-width: 960px) {
    display: none;
  } */
`;
const Input = styled.input`
  position: relative;
  width: 100%;
  border: none;
  height: 40px;
  margin-bottom: 7px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
  padding-left: 50px;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
  &:focus {
    outline: none;
    --tw-ring-color: rgba(141, 184, 252, 0.3);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(5px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
  }
`;

export default function UserSideBar() {
  const [keyword, setKeyword] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const searchUser = () => {};
  return (
    <Wrapper>
      <p className="nanum-bold">Users</p>
      <Input value={keyword} onChange={handleChange} />
      <button onClick={searchUser}></button>
      <p>직군별 검색</p>
      <p>스택별 검색</p>
      <p>지역별 검색</p>
    </Wrapper>
  );
}
