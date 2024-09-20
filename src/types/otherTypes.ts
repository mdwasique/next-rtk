export interface AuthState {
  name: string | null;
  email: string | null;
  userType: string | null;
  token: string | null;
}

export const initialState: AuthState = {
  name: null,
  email: null,
  userType: null,
  token: null,
};
