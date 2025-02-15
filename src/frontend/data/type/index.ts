import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export type UserRole = 'Student' | 'Admin' | 'Employer';

export type EditingItem = {
  id?: string;
  category?: string;
};

export type SessionData = {
  agent: HttpAgent;
  principalId: string;
  accountId: string;
} | null;

export type role = {
  _id: string;
  name: UserRole;
  code: string;
};

export type UserData = {
  _id: string;
  access_token: string;
  name: string;
  username: string;
  password: string;
  roles: role[];
  studentID: string;
  dateOfBirth: string;
  principalID: string;
  tokens: string;
};

export type EventData = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  tokens: number;
  code: string;
};

export type CourseData = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  tokens: number;
  code: string;
};

export type ProductData = {
  _id: string;
  name: string;
  description: string;
  seller: string;
  imageUrl: string;
  price: number;
  code: string;
};

export type GradeData = {
  _id: string;
  subjectName: string;
  subjectCode: string;
  subjectStatus: string;
  grade: number;
  tokens: number;
  studentID: string;
};

export type AdData = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  details: string;
};

export type NFTData = {
  description: string;
  id: number;
  name: string;
  owner: Principal;
  url: string;
};
