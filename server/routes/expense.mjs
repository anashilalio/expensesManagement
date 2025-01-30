import { Router } from 'express'
import { Expense } from '../schemas/expense.js'
import { checkSchema, matchedData, validationResult } from 'express-validator';
import {
    addExpenseValidationSchema,
    deleteExpenseValidationSchema,
    updateExpenseValidationSchema
} from '../utils/validationSchemas.mjs';

const router = Router()

router.post(
    "/api/expense/add",
    checkSchema(addExpenseValidationSchema),
    async (request, response) => {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)

        data.userId = request.session.passport.user

        const newExpense = new Expense(data)

        try {
            const savedExpense = await newExpense.save()
            return response.status(201).send(savedExpense)
        } catch (error) {
            console.dir(error)
            return response.send(400).send()
        }
    }
)

router.post(
    "/api/expense/delete",
    checkSchema(deleteExpenseValidationSchema),
    async (request, response) => {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const { id } = matchedData(request)

        try {
            const deletedExpense = await Expense.findByIdAndDelete(id)
            if (deletedExpense)
                return response.status(201).send()
            else
                return response.send(400).send({ msg: "error deleting this expense" })
        } catch (error) {
            console.dir(error)
            return response.send(400).send()
        }
    }
)

router.post(
    "/api/expense/update",
    checkSchema(updateExpenseValidationSchema),
    async (request, response) => {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const { id, description, amount } = matchedData(request)

        try {
            const updatedExpense = await Expense.findByIdAndUpdate(id, { description, amount }, { new: true })
            console.log(updatedExpense);
            
            if (updatedExpense)
                return response.status(201).send(updatedExpense)
            else
                return response.send(400).send({ msg: "error updating this expense" })
        } catch (error) {
            console.dir(error)
            return response.send(400).send()
        }
    }
)

export default router