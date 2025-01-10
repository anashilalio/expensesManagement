import { response, Router } from 'express'
import {User} from '../schemas/user.js'
import { UserValidationSchema } from '../utils/validationSchemas.mjs'
import { checkSchema, matchedData, validationResult } from 'express-validator'

const router = Router()

router.post(
    "/api/addUser",
    checkSchema(UserValidationSchema),
    async (request, response) => {
        
        const result = validationResult(request)
        
        if(!result.isEmpty()){
            return response.status(400).send({ errors: result.array()})
        }
        const data = matchedData(request)

        const newUser = new User(data)

        try {
            const savedUser = await newUser.save()
            return response.status(201).send()
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

export default router