import { response, Router } from 'express'
import { Budget } from '../schemas/budget.js'
import { BudgetValidationSchema } from '../utils/validationSchemas.mjs'
import { checkSchema } from 'express-validator'

const router = Router()

router.post(
    "/api/budget/add",
    checkSchema(BudgetValidationSchema),
    async (request, response) => {

        const result = validationResult(request)

        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)
        const newBudget = new Budget(data)

        try {
            const savedBudget = await newBudget.save()
            return response.status(201).send(savedBudget)
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

export default router