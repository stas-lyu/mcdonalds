import { Action } from '@ngrx/store';
import { User } from '../models/auth.model';

export enum EAuthActions {
  Login = '[Auth] Login In Process',
  LoginSuccess = '[Auth] Login Success',
  LoginAuthFailure = '[Auth] Login Failure',
  Registration = '[Auth] Registration In Progress',
  RegistrationSuccess = '[Auth] Registration Success',
  RegistrationAuthFailure = '[Auth] Registration Failure',
  SetCurrentUser = '[User] Setup User In Progress',
  SetCurrentUserSuccess = '[User] Setup User Success',
}

export class LoginAuth implements Action {
  public readonly type = EAuthActions.Login;

  constructor(public payload: any) {}
}

export class LoginAuthSuccess implements Action {
  public readonly type = EAuthActions.LoginSuccess;

  constructor(public payload: any) {}
}

export class RegistrationAuth implements Action {
  public readonly type = EAuthActions.Registration;

  constructor(public payload: any) {}
}

export class RegistrationAuthSuccess implements Action {
  public readonly type = EAuthActions.RegistrationSuccess;

  constructor(public payload: any) {}
}

export class LoginAuthFailure implements Action {
  public readonly type = EAuthActions.LoginAuthFailure;

  constructor(public payload: { error: any }) {}
}

export class SetCurrentUser implements Action {
  public readonly type = EAuthActions.SetCurrentUser;

  constructor(public payload: { error: any }) {}
}

export class SetCurrentUserSuccess implements Action {
  public readonly type = EAuthActions.SetCurrentUserSuccess;

  constructor(public payload: { error: any }) {}
}

export class RegistrationAuthFailure implements Action {
  public readonly type = EAuthActions.RegistrationAuthFailure;

  constructor(public payload: { error: any }) {}
}

export type AuthActions =
  | LoginAuth
  | LoginAuthSuccess
  | LoginAuthFailure
  | RegistrationAuth
  | SetCurrentUser
  | SetCurrentUserSuccess
  | RegistrationAuthSuccess
  | RegistrationAuthFailure;
