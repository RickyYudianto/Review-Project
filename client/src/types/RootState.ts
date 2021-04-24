import { AuthState } from '../app/types/auth.type';
import { UserState } from '../app/types/user.type';

export interface RootState {
  authState: AuthState;
  userState: UserState;
}
