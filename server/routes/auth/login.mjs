import { Router } from 'express'
import { loginCredentialsValidationSchema } from '../../utils/validationSchemas.mjs'
import { checkSchema } from 'express-validator'
import passport from 'passport'
import "../../strategies/local.mjs"

const router = Router()

router.post(
    "/api/auth/login",
    passport.authenticate("local", {failureMessage: true}),
    (request, response) => {
        return response.sendStatus(200)
    }
)

export default router