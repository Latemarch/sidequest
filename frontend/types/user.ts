export interface IUser {
  MEMBER_ID: number;
  EMAIL: string;
  USER_NAME: string;
  NICK_NAME: string;
  ABOUT_ME: string;
  YEAR_OF_DEV: number;
  CREATED_AT: string;
  UPDATED_AT: string;
  DELETED: string;
  PHONE_NUMBER: string;
  TOTAL_STAR: string;
  PROFILE_IMAGE: string;
}

//로그인한 유저의 데이터 상태
export type UserState = {
  aboutMe: string;
  email: string;
  name: string;
  phone: string;
  position: string;
  profileImageUrl: string;
  totalStar: number;
  yearOfDev: number;
};
