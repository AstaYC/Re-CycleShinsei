import { createReducer, on } from '@ngrx/store';
import { registerUser } from '../action/auth.actions';

export interface AuthState {
  users: any[];
}

const initialState: AuthState = {
  users: []
};

export const authReducer = createReducer(
  initialState,
  on(registerUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  }))
);
