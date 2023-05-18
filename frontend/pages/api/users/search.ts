import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const keyword = req.query.keyword as string;

  // 이름에 검색어가 포함된 모든 사용자 찾기
  const searchedUsers = await client.user.findMany({
    where: {
      name: {
        contains: keyword,
      },
    },
    select: {
      id: true,
      name: true,
      profileImageUrl: true,
      location: true,
      yearOfDev: true,
      position: true,
      aboutMe: true,
      stacks: true,
      roles: true,
      totalStar: true,
    },
  });

  if (searchedUsers.length === 0) {
    return res.status(200).json({ ok: false, msg: 'user not found' });
  }

  // 일치하는 사용자들 반환
  return res.status(200).json(searchedUsers);
}

export default withHandler({ method: 'GET', handler, isPrivate: false });
