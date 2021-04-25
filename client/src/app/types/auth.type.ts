import User from '../models/user.model';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
}

export type ContainerState = AuthState;
