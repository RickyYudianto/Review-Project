import User from '../models/user.model';

export interface UserState {
  users: User[];
  totalData: number;
  page: number;
  size: number;
}

export type ContainerState = UserState;
