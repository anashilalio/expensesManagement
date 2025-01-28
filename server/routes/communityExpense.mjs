import { Router } from 'express'
import { CommunityExpense } from '../schemas/communityExpense.js'
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { CommunityExpenseValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router()

router.post(
    "/api/community/expense/add",
    checkSchema(CommunityExpenseValidationSchema),
    async (request, response) => {
        
        const result = validationResult(request)

        if(!result.isEmpty()){
            return response.status(400).send({ errors: result.array()})
        }

        const data = matchedData(request)
        
        const newCommunityExpense = new CommunityExpense(data)

        try {
            const savedCommunityExpense = await newCommunityExpense.save()
            console.log(savedCommunityExpense);
            
            return response.status(201).send(savedCommunityExpense)
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

export default router