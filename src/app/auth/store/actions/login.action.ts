import { createAction, props } from "@ngrx/store";
import { BackEndErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { ActionTypes } from "../actionTypes";
import { LoginRequestInterface } from "../../types/loginRequest.interface";

export const loginAction = createAction(ActionTypes.LOGIN, props<{request: LoginRequestInterface}>());

export const loginSuccessAction = createAction(ActionTypes.LOGIN_SUCCESS, props<{currentUser: CurrentUserInterface}>());

export const loginFailedAction = createAction(ActionTypes.LOGIN_FAILED, props<{errors: BackEndErrorsInterface}>());