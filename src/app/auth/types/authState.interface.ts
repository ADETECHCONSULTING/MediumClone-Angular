import { BackEndErrorsInterface } from "src/app/shared/types/backendErrors.interface"
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface"

export interface AuthStateInterface {
    isSubmitting: boolean
    currentUser: CurrentUserInterface | null //by default initial state
    isLoggedIn: boolean | null
    validationErrors : BackEndErrorsInterface | null
}