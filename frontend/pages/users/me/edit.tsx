import useUser from '@/hooks/react-query/useUser';
import useApi from '@/hooks/useApi';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { BiImageAdd } from 'react-icons/bi';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  /* padding: 20px; */
  width: 800px;
  height: 700px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  #picture {
    /* display: none; */
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 30px;
    border-radius: 10px;
  }
  span {
    justify-content: flex-end;
  }
`;
const ImgWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 80px;
  margin-top: 30px;
  background-color: #cbcbcb;

  input {
    border: 1px solid red;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  padding-top: 40px;
`;
const P = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
  color: white;
  padding: 10px;
  width: 200px;
  position: absolute;
  bottom: 0px;
`;
const Input = styled.input`
  position: relative;
  width: 100%;
  border: none;
  height: 40px;
  margin-bottom: 7px;
  border-radius: 10px;
  padding: 10px;
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
const Label = styled.p.attrs({ className: 'nanum-bold' })`
  padding-top: 20px;
  padding-bottom: 10px;
`;

const LabelContainer = styled.div`
  width: 300px;
`;

interface ISubmit {
  [key: string]: string;
}
const BASE_URL = 'http://43.201.253.57:8080/';
export default function edit() {
  const queryClient = useQueryClient();
  const {
    getMyInfo: { data: user },
  } = useUser();
  const { register, handleSubmit } = useForm();

  const [submit, { data }] = useApi('/api/user/edit');

  const onValid = (data: ISubmit) => {
    submit(data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (data && data.ok) {
      queryClient.invalidateQueries(['users', 'me']);
    }
  }, [data]);

  return (
    <Wrapper>
      {user && (
        <>
          <ImgWrapper>
            <img alt={user.name} src={user.profileImageUrl} />
            <P>Change Image</P>
          </ImgWrapper>
          <form onSubmit={handleSubmit(onValid, onInValid)}>
            <Label>UserName</Label>
            <Input {...register('name')} placeholder={user.name} />
            <Label>개발기간</Label>
            <Input
              {...register('yearOfDev', {
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Please input only numbers',
                },
              })}
              placeholder={user.yearOfDev + ''}
            />
            <Label>Phone</Label>
            <Input {...register('phone')} placeholder={user.phone} />
            <Label>Email</Label>
            <Input {...register('email')} placeholder={user.email} />
            <Label>About Me</Label>
            <Input {...register('aboutMe')} placeholder={user.aboutMe} />
            <button>submit</button>
          </form>
        </>
      )}
    </Wrapper>
  );
}
