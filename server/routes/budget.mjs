import { response, Router } from 'express'
import { Budget } from '../schemas/budget.js'
import { BudgetValidationSchema, updateAmountBudgetValidationSchema, deleteBudgetValidationSchema } from '../utils/validationSchemas.mjs'
import { checkSchema, matchedData, validationResult } from 'express-validator'
import mongoose from 'mongoose'

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

        data.userId = request.session.passport.user
        
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

router.patch(
    "/api/budget/appendToCurrent",
    checkSchema(updateAmountBudgetValidationSchema),
    async (request, response) => {

        const result = validationResult(request)
        
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)

        const userId = request.session.passport.user
        
        try {
            const budget = await Budget.findOneAndUpdate(
                { userId, category: data.category },
                {currentAmount: data.amount}
            )
            
            if(budget){
                return response.sendStatus(200)
            }else{
                return response.sendStatus(400)
            }
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

router.patch(
    "/api/budget/updateMax",
    checkSchema(updateAmountBudgetValidationSchema),
    async (request, response) => {

        const result = validationResult(request)
        
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)

        const userId = request.session.passport.user
        
        try {
            const budget = await Budget.findOneAndUpdate(
                { userId, category: data.category },
                {maxAmount: data.amount}
            )
            
            if(budget){
                return response.sendStatus(200)
            }else{
                return response.sendStatus(400)
            }
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

router.delete(
    "/api/budget/delete",
    checkSchema(deleteBudgetValidationSchema),
    async (request, response) => {

        const result = validationResult(request)
        
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)

        const userId = request.session.passport.user
        
        try {
            const budget = await Budget.findOneAndDelete(
                { userId, category: data.category }
            )
            
            if(budget){
                return response.sendStatus(200)
            }else{
                return response.sendStatus(400)
            }
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

export default router