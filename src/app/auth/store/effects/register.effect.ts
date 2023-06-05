
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { registerAction, registerFailedAction, registerSuccessAction } from '../actions/register.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { of } from 'rxjs';

@Injectable()
export class RegisterEffect {

    constructor(private authService: AuthService, private actions$: Actions) { }
    
    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerAction),
            switchMap(({request}) => {
                return this.authService.register(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        return registerSuccessAction({currentUser})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(registerFailedAction({errors: errorResponse.error.errors}))
                    })
                )
            })
        )
    })

}