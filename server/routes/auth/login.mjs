import { Router } from 'express'
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