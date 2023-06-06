import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { AppStateInterface } from "src/app/shared/types/appState.interface";

export const authFeatureSelector = createFeatureSelector<
    AppStateInterface,
    AuthStateInterface
>('auth')

export const isSubmittingSelector = createSelector(
    authFeatureSelector,
    (state: AuthStateInterface) => state.isSubmitting
);

export const validationErrorsSelector = createSelector(
    authFeatureSelector, 
    (authState: AuthStateInterface) => authState.validationErrors
)

export const isLoggedInSelector = createSelector(
    authFeatureSelector,
    (state: AuthStateInterface) => state.isLoggedIn
)

export const isAnonymousSelector = createSelector(
    authFeatureSelector,
    (state: AuthStateInterface) => state.isLoggedIn === false
)

export const currentUserSelector = createSelector(
    authFeatureSelector,
    (state: AuthStateInterface) => state.currentUser
)