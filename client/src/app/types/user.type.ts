import User from '../models/user.model';

export interface UserState {
  users: User[];
  formValue: User;
  selected: number[];
  totalData: number;
  page: number;
  size: number;
}

export type ContainerState = UserState;
