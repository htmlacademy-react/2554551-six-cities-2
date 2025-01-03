export type UserAuth = { email: string; password: string };

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type UserDataValidity = { email: boolean; password: boolean };
