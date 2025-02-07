import { createAction, props } from '@ngrx/store';

export const registerUser = createAction(
  '[Auth] Register User',
  props<{ user: any }>()
);

export const loginUser = createAction(
  '[Auth] Login User',
  props<{ email: string; password: string }>()
);
