import { Injectable } from '@angular/core';
import { getCurrentUserAction, getCurrentUserFailedAction, getCurrentUserSuccessAction } from '../actions/getCurrentUser.action';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class GetCurrentUserEffect {
   
    constructor(private authService: AuthService,
        private actions$: Actions,
        private persistanceService: PersistanceService,
        private router: Router) { }
    
    getCurrentUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getCurrentUserAction),
            switchMap(() => {
                const token = this.persistanceService.get('accessToken')
                if (!token) {
                    return of(getCurrentUserFailedAction({errors: null}))
                }
                return this.authService.getCurrentUser().pipe(
                    map((currentUser: CurrentUserInterface) => {
                        this.persistanceService.set('accessToken', currentUser.token)
                        return getCurrentUserSuccessAction({currentUser})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(getCurrentUserFailedAction({errors: errorResponse.error.errors}))
                    })
                )
            })
        )
    })

}