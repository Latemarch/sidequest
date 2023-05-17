import { withIronSessionApiRoute } from 'iron-session/next';
const cookieOpstions = {
  cookieName: 'sideQuest',
  password: process.env.COOKIE_PASSWORD!,
};

export default function (fn: any) {
  return withIronSessionApiRoute(fn, cookieOpstions);
}
