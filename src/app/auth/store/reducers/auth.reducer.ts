import { EAuthActions, AuthActions } from '../actions/auth.actions';
import { initialUserState, IUserState } from '../state/auth.state';

export const authReducer = (
  state = initialUserState,
  action: AuthActions
): IUserState => {
  switch (action.type) {
    case EAuthActions.Registration: {
      return {
        ...state,
        isLoading: true,
        categoriesError: '',
      };
    }
    case EAuthActions.RegistrationSuccess: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    }
    case EAuthActions.Login: {
      return {
        ...state,
        isLoading: true,
        categoriesError: '',
      };
    }
    case EAuthActions.LoginSuccess: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    }
    // case EAuthActions.SetCurrentUser: {
    //   return {
    //     ...state,
    //   };
    // }
    // case EAuthActions.SetCurrentUserSuccess: {
    //   return {
    //     ...state,
    //     isAdmin: action.payload,
    //   };
    // }
    default:
      return state;
  }
};
