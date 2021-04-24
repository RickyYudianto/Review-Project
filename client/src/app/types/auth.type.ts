import User from '../models/user.model';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export type ContainerState = AuthState;
