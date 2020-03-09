export const typeDefs = ["type GetCurrentUserResponse {\n  res: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetCurrentUser: GetCurrentUserResponse!\n}\n\ntype User {\n  id: String!\n  fbId: String\n  googleId: String\n  username: String!\n  password: String\n  profilePhoto: String!\n  email: String\n  isEmailVerified: Boolean\n  phone: String\n  isPhoneVerified: Boolean\n  createAt: String!\n  updateAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  GetCurrentUser: GetCurrentUserResponse;
}

export interface GetCurrentUserResponse {
  res: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: string;
  fbId: string | null;
  googleId: string | null;
  username: string;
  password: string | null;
  profilePhoto: string;
  email: string | null;
  isEmailVerified: boolean | null;
  phone: string | null;
  isPhoneVerified: boolean | null;
  createAt: string;
  updateAt: string;
}
