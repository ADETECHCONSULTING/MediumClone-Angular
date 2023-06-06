
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { of } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';
import { loginAction, loginFailedAction, loginSuccessAction } from '../actions/login.action';

@Injectable()
export class LoginEffect {

    constructor(private authService: AuthService,
        private actions$: Actions,
        private persistanceService: PersistanceService,
        private router: Router) { }
    
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginAction),
            switchMap(({request}) => {
                return this.authService.login(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        this.persistanceService.set('accessToken', currentUser.token)
                        return loginSuccessAction({currentUser})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(loginFailedAction({errors: errorResponse.error.errors}))
                    })
                )
            })
        )
    })

    redirectAfterSubmit$ = createEffect(
        () => this.actions$.pipe(
            ofType(loginSuccessAction),
            tap(() => {
                this.router.navigateByUrl('/')
            })
        ),
        {dispatch: false }
    )

}