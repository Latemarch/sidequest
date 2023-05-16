import { NextApiRequest, NextApiResponse } from 'next';

interface IProps {
  method: 'GET' | 'POST' | 'DELETE';
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}
export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: IProps) {
  console.log('epcted', method, isPrivate);

  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).json({ got: req.method, expected: method });
    }
    if (isPrivate && !req?.session?.user)
      return res.status(401).json({ error: 'Unauthorized' });

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
