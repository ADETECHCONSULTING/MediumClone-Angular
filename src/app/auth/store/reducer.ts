import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { registerAction, registerFailedAction, registerSuccessAction } from "./actions/register.actions";
import { loginAction, loginFailedAction, loginSuccessAction } from "./actions/login.action";
import { getCurrentUserAction, getCurrentUserFailedAction, getCurrentUserSuccessAction } from "./actions/getCurrentUser.action";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null
}

const authReducer = createReducer(
    initialState,
    on(registerAction, (state: AuthStateInterface) => (
        {
            ...state,
            isSubmitting: true,
            validationErrors: null
        })
    ),
    on(registerSuccessAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser
    })),
    on(registerFailedAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    })),
    on(loginAction, (state): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: null
    })),
    on(loginSuccessAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser
    })),
    on(loginFailedAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    })),
    on(getCurrentUserAction, (state): AuthStateInterface => ({
        ...state, 
        isLoading: true
    })),
    on(getCurrentUserSuccessAction, (state, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        currentUser: action.currentUser,
        isLoggedIn: true
    })),
    on(getCurrentUserFailedAction, (state, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        currentUser: null
    })),
);

export function reducers(state: AuthStateInterface | undefined, action: Action) {
    return authReducer(state, action);
}