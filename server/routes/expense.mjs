import { Router } from 'express'
import { Expense } from '../schemas/expense.js'
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { ExpenseValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router()

router.post(
    "/api/addExpense",
    checkSchema(ExpenseValidationSchema),
    async (request, response) => {
        console.log(request.session.id);
        request.sessionStore.get(request.session.id, (err, data) => {
            console.log(data);
        })

        const result = validationResult(request)
        
        if(!result.isEmpty()){
            return response.status(400).send({ errors: result.array()})
        }
        const data = matchedData(request)

        const newExpense = new Expense(data)

        try {
            const savedExpense = await newExpense.save()
            return response.status(201).send(savedExpense)
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

export default router