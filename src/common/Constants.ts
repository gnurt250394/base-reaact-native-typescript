export enum TypeCommon {
  ACCEPTED = 'ACCEPTED',
  WAITING = 'WAITING',
  CREATED = 'CREATED',
  jobRecived = 'jobRecived',
  requestInterviewRecived = 'requestInterviewRecived',
}

export enum KEY {
  // API_KEY = 'AIzaSyBgThNSye3KMUVK9vcUpngYdividNl-Xm8',
  API_KEY = 'AIzaSyD9OuYnIP9tfhvnZSl9dPdi8YM_j60L9w4',
}
export enum ROLE {
  user = 'user',
  partner = 'partner',
}
export enum LevelCode {
  unskilled = '1',
  secondary = '2',
  high = '3',
  students = '4',
  university = '5',
  postgraduate = '6',
}

export type RoleType = 'partner' | 'user';
export type JobType =
  | 'ACCEPTED'
  | 'WAITING'
  | 'CREATED'
  | 'jobRecived'
  | 'requestInterviewRecived';
