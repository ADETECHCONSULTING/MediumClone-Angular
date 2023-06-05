import { createAction, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { ActionTypes } from "../actionTypes";
import { BackEndErrorsInterface } from "src/app/shared/types/backendErrors.interface";

export const registerAction = createAction(ActionTypes.REGISTER, props<{request: RegisterRequestInterface}>());

export const registerSuccessAction = createAction(ActionTypes.REGISTER_SUCCESS, props<{currentUser: CurrentUserInterface}>());

export const registerFailedAction = createAction(ActionTypes.REGISTER_FAILED, props<{errors: BackEndErrorsInterface}>());