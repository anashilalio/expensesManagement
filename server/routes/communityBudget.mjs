import { Router } from 'express'
import { CommunityBudget } from '../schemas/communityBudget.js'
import { CommunityBudgetValidationSchema, deleteCommunityBudgetValidationSchema, updateCommunityAmountBudgetValidationSchema } from '../utils/validationSchemas.mjs'
import { checkSchema, matchedData, validationResult } from 'express-validator'

const router = Router()

router.post(
    "/api/community/budget/add",
    checkSchema(CommunityBudgetValidationSchema),
    async (request, response) => {

        const result = validationResult(request)
        console.log(result);
        
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)
        console.log(data);
        
        const newCommunityBudget = new CommunityBudget(data)

        try {
            const savedCommunityBudget = await newCommunityBudget.save()
            console.log(savedCommunityBudget);

            return response.status(201).send(savedCommunityBudget)
        } catch (error) {
            console.dir(error)
            return response.sendStatus(400)
        }
    }
)

router.patch(
    "/api/community/budget/appendToCurrent",
    checkSchema(updateCommunityAmountBudgetValidationSchema),
    async (request, response) => {

        const result = validationResult(request)
        
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)
        
        try {
            const communityBudget = await CommunityBudget.findOneAndUpdate(
                { communityCode: data.communityCode, category: data.category },
                {currentAmount: data.amount}
            )
            if(communityBudget){
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
    "/api/community/budget/updateMax",
    checkSchema(updateCommunityAmountBudgetValidationSchema),
    async (request, response) => {

        const result = validationResult(request)
        
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)
        
        try {
            const communityBudget = await CommunityBudget.findOneAndUpdate(
                { communityCode: data.communityCode, category: data.category },
                {maxAmount: data.amount}
            )
            
            if(communityBudget){
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
    "/api/community/budget/delete",
    checkSchema(deleteCommunityBudgetValidationSchema),
    async (request, response) => {

        const result = validationResult(request)
        
        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request)

        
        try {
            const communityBudget = await CommunityBudget.findOneAndDelete(
                { communityCode: data.communityCode, category: data.category }
            )
            
            if(communityBudget){
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