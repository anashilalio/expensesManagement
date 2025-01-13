import { Router } from 'express'
import { Expense } from '../schemas/expense.js'
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { ExpenseValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router()

router.post(
    "/api/expense/add",
    checkSchema(ExpenseValidationSchema),
    async (request, response) => {
        const result = validationResult(request)

        if(!result.isEmpty()){
            return response.status(400).send({ errors: result.array()})
        }

        const data = matchedData(request)
        
        data.userId = request.session.passport.user        
        
        const newExpense = new Expense(data)

        try {
            const savedExpense = await newExpense.save()
            return response.status(201).send()
        } catch (error) {
            console.dir(error)
            return response.send(400).send()
        }
    }
)

export default router