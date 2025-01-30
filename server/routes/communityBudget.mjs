import { Router } from 'express'
import { CommunityBudget } from '../schemas/communityBudget.js'
import { CommunityBudgetValidationSchema } from '../utils/validationSchemas.mjs'
import { checkSchema, matchedData, validationResult } from 'express-validator'

const router = Router()

router.post(
    "/api/community/budget/add",
    checkSchema(CommunityBudgetValidationSchema),
    async (request, response) => {

        const result = validationResult(request)
        
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)
        
        const newCommunityBudget = new CommunityBudget(data)

        try {
            const savedCommunityBudget = await newCommunityBudget.save()
            return response.status(201).send(savedCommunityBudget)
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

export default router