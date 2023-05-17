import { User } from '@prisma/client';
import { api } from '.';

export async function getAuth(): Promise<User> {
  return api('/users/1') //
    .then((res) => res.data);
}

export async function getUsers(): Promise<User[]> {
  return api('/users') //
    .then((res) => res.data);
}

export async function getUserById(id: number): Promise<User> {
  return api(`/users/${id}`) //
    .then((res) => res.data);
}
