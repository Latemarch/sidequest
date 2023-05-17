import { useState } from 'react';

interface IObj {
  isLoading: boolean;
  data: undefined | any;
  error: undefined | any;
}

export default function useApi(url: string): [(data?: any) => void, IObj] {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data?: any) {
    setIsLoading(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }) //
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }
  return [mutation, { isLoading, data, error }];
}

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { api } from '@/util/api';

// interface IObj {
//   isLoading: boolean;
//   data: undefined | any;
//   auth: undefined | any;
//   error: undefined | any;
// }

// const BASE_URL = 'http://13.209.14.135:8080/';

// export default function usePostApi(
//   endpoint: string
// ): [(data?: any) => void, IObj] {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState<undefined | any>(undefined);
//   const [auth, setAuth] = useState<undefined | any>(undefined);
//   const [error, setError] = useState<undefined | any>(undefined);

//   //유저 데이터 저장할 atom

//   //조회에 성공하면 이동하기 위해
//   const router = useRouter();

//   function mutation(data?: any) {
//     setIsLoading(true);
//     // axios
//     //   .post(BASE_URL + endpoint, data)
//     api
//       .post('/login', data)
//       .then((res) => {
//         setData(res);
//         setAuth(res.headers['authorization']);
//       })
//       .then(() => {
//         router.push('/'); //값을 모두 세팅하고 홈으로 이동
//       })
//       .catch(setError)
//       .finally(() => setIsLoading(false));
//   }

//   return [mutation, { isLoading, data, auth, error }];
// }
